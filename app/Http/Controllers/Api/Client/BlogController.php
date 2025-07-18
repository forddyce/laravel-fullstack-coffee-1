<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogTag;
use App\Http\Resources\BlogResource;
use App\Http\Resources\BlogTagResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class BlogController extends Controller
{
    /**
     * Retrieve the latest 3 active blog articles for the home page.
     * GET /api/client/blogs/latest
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function latest()
    {
        $blogs = Blog::where('is_active', true)
            ->where('published_date', '<=', now())
            ->orderBy('published_date', 'desc')
            ->take(3)
            ->get();

        return BlogResource::collection($blogs);
    }

    /**
     * List active blogs with pagination and optional search by title.
     * GET /api/client/blogs
     * Query Parameters: ?page={page}&perPage={per_page}&search={title_keyword}
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $perPage = $request->query('perPage', 10);
        $search = $request->query('search');

        $blogs = Blog::where('is_active', true)
            ->where('published_date', '<=', now())
            ->when($search, function (Builder $query, $search) {
                $query->where('title', 'like', '%' . $search . '%');
            })
            ->orderBy('published_date', 'desc')
            ->paginate($perPage);

        return BlogResource::collection($blogs);
    }

    /**
     * List active blogs related to a specific tag with pagination.
     * GET /api/client/blog-tags/{slug}/blogs
     * Path Parameter: {slug} of the blog tag
     * Query Parameters: ?page={page}&perPage={per_page}
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $tagSlug
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection|\Illuminate\Http\JsonResponse
     */
    public function blogsByTag(Request $request, string $tagSlug)
    {
        $tag = BlogTag::where('slug', $tagSlug)
            ->where('is_active', true)
            ->first();

        if (!$tag) {
            return response()->json(['message' => 'Blog tag not found or not active.'], 404);
        }

        $perPage = $request->query('perPage', 10);

        $blogs = $tag->blogs()
            ->where('is_active', true)
            ->where('published_date', '<=', now())
            ->orderBy('published_date', 'desc')
            ->paginate($perPage);

        return response()->json([
            'tag' => new BlogTagResource($tag),
            'blogs' => BlogResource::collection($blogs)->response()->getData(true)
        ]);
    }

    /**
     * Retrieve a single blog post by its slug.
     * This is useful for individual blog post pages.
     * GET /api/client/blogs/{slug}
     *
     * @param  string  $blogSlug
     * @return \App\Http\Resources\BlogResource|\Illuminate\Http\JsonResponse
     */
    public function show(string $blogSlug)
    {
        $blog = Blog::with('tags')
            ->where('slug', $blogSlug)
            ->where('is_active', true)
            ->where('published_date', '<=', now())
            ->first();

        if (!$blog) {
            return response()->json(['message' => 'Blog post not found or not published.'], 404);
        }

        $tagIds = $blog->tags->pluck('id');
        $relatedBlogs = collect();

        if ($tagIds->isNotEmpty()) {
            $relatedBlogs = Blog::where('is_active', true)
                ->where('published_date', '<=', now())
                ->where('id', '!=', $blog->id)
                ->whereHas('tags', function (Builder $query) use ($tagIds) {
                    $query->whereIn('blog_tags.id', $tagIds);
                })
                ->orderBy('published_date', 'desc')
                ->take(3)
                ->get();
        }

        return response()->json([
            'blog' => new BlogResource($blog),
            'related_blogs' => BlogResource::collection($relatedBlogs),
        ]);
    }
}
