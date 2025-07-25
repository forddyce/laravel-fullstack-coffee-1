<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogTag;
use App\Http\Resources\BlogResource;
use App\Http\Resources\BlogTagResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;

class BlogController extends Controller
{
    protected const CACHE_TAG = 'client_blogs';
    protected const CACHE_PREFIX_CLIENT = 'client_blogs_';

    /**
     * Retrieve the latest 3 active blog articles for the home page.
     * GET /api/client/blogs/latest
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function latest()
    {
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'latest';
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $blogs = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(60),
            function () {
                return Blog::where('is_active', true)
                    ->where('published_date', '<=', now())
                    ->orderBy('published_date', 'desc')
                    ->take(3)
                    ->get();
            }
        );

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
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'index_' . md5(json_encode($request->query()));
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $blogs = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(5),
            function () use ($request) {
                $perPage = $request->query('perPage', 9);
                $search = $request->query('search');

                return Blog::where('is_active', true)
                    ->where('published_date', '<=', now())
                    ->when($search, function (Builder $query, $search) {
                        $query->where('title', 'like', '%' . $search . '%');
                    })
                    ->orderBy('published_date', 'desc')
                    ->paginate($perPage);
            }
        );

        return $blogs;
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
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'tag_blogs_' . $tagSlug . '_' . md5(json_encode($request->query()));
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $responseContent = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(10),
            function () use ($request, $tagSlug) {
                $tag = BlogTag::where('slug', $tagSlug)
                    ->where('is_active', true)
                    ->first();

                if (!$tag) {
                    return null;
                }

                $perPage = $request->query('perPage', 10);
                $search = $request->query('search');

                $blogs = $tag->blogs()
                    ->where('is_active', true)
                    ->where('published_date', '<=', now())
                    ->when($search, function (Builder $query, $search) {
                        $query->where('title', 'like', '%' . $search . '%');
                    })
                    ->orderBy('published_date', 'desc')
                    ->paginate($perPage);

                return [
                    'tag' => new BlogTagResource($tag),
                    'blogs' => BlogResource::collection($blogs)->response()->getData(true)
                ];
            }
        );

        if ($responseContent === null) {
            return response()->json(['message' => 'Blog tag not found or not active.'], 404);
        }

        return response()->json($responseContent);
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
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'show_' . $blogSlug;
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $responseContent = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(60),
            function () use ($blogSlug) {
                $blog = Blog::with('tags')
                    ->where('slug', $blogSlug)
                    ->where('is_active', true)
                    ->where('published_date', '<=', now())
                    ->first();

                if (!$blog) {
                    return null;
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

                return [
                    'blog' => new BlogResource($blog),
                    'related_blogs' => BlogResource::collection($relatedBlogs),
                ];
            }
        );

        if ($responseContent === null) {
            return response()->json(['message' => 'Blog post not found or not published.'], 404);
        }

        return response()->json($responseContent);
    }
}
