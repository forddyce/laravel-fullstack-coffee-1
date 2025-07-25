<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogTag;
use App\Http\Requests\Admin\BlogRequest;
use App\Http\Resources\BlogResource;
use App\Http\Resources\BlogTagResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;

class BlogController extends Controller implements HasMiddleware
{
    protected const CACHE_TAG = 'blogs';
    protected const CACHE_PREFIX_ADMIN = 'admin_blogs_';

    public static function middleware(): array
    {
        return [
            new Middleware('permission:manage blog posts'),
        ];
    }

    public function index(Request $request)
    {
        $cacheKey = self::CACHE_PREFIX_ADMIN . 'index_' . md5(json_encode($request->query()));
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();
        $blogs = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(5),
            function () use ($request) {
                return Blog::with('tags')
                    ->orderBy($request->query('sortBy', 'published_date'), $request->query('sortOrder', 'desc'))
                    ->when($request->filled('search'), function ($query) use ($request) {
                        $query->where('title', 'like', '%' . $request->query('search') . '%');
                    })
                    ->paginate($request->query('perPage', 10));
            }
        );

        return Inertia::render('Blog/Index', [
            'blogs' => BlogResource::collection($blogs),
            'filters' => $request->only(['search', 'sortBy', 'sortOrder', 'perPage']),
        ]);
    }

    public function create()
    {
        $cacheKey = self::CACHE_PREFIX_ADMIN . 'available_tags';
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $blogTags = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(60),
            function () {
                return BlogTag::where('is_active', true)->select('id', 'title')->get();
            }
        );

        return Inertia::render('Blog/Create', [
            'availableTags' => BlogTagResource::collection($blogTags),
        ]);
    }

    public function store(BlogRequest $request)
    {
        $blog = Blog::create($request->validated());
        if ($request->has('tags')) {
            $blog->tags()->sync($request->input('tags'));
        }

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post created successfully!');
    }

    public function show(Blog $blog)
    {
        $cacheKey = self::CACHE_PREFIX_ADMIN . 'show_' . $blog->slug;
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $blog = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(10),
            function () use ($blog) {
                return $blog->load('tags');
            }
        );

        return new BlogResource($blog);
    }

    public function edit(Blog $blog)
    {
        $cacheKey = self::CACHE_PREFIX_ADMIN . 'available_tags';
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();
        $blogTags = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(60),
            function () {
                return BlogTag::where('is_active', true)->select('id', 'title')->get();
            }
        );

        return Inertia::render('Blog/Edit', [
            'blog' => new BlogResource($blog->load('tags')),
            'availableTags' => BlogTagResource::collection($blogTags),
        ]);
    }

    public function update(BlogRequest $request, Blog $blog)
    {
        $blog->update($request->validated());

        if ($request->has('tags')) {
            $blog->tags()->sync($request->input('tags'));
        } else {
            $blog->tags()->detach();
        }

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post updated successfully!');
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog post deleted successfully!');
    }
}
