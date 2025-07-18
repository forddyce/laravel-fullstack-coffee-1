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
use Illuminate\Support\Facades\Log;

class BlogController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:manage blog posts'),
        ];
    }

    public function index(Request $request)
    {
        $blogs = Blog::with('tags')
            ->orderBy($request->query('sortBy', 'published_date'), $request->query('sortOrder', 'desc'))
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->query('search') . '%');
            })
            ->paginate($request->query('perPage', 10));

        return Inertia::render('Blog/Index', [
            'blogs' => BlogResource::collection($blogs),
            'filters' => $request->only(['search', 'sortBy', 'sortOrder', 'perPage']),
        ]);
    }

    public function create()
    {
        $blogTags = BlogTag::where('is_active', true)->select('id', 'title')->get();
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
        $blog->load('tags');
        return new BlogResource($blog);
    }

    public function edit(Blog $blog)
    {
        Log::info($blog);
        $blog->load('tags');
        $availableTags = BlogTag::where('is_active', true)->select('id', 'title')->get();

        return Inertia::render('Blog/Edit', [
            'blog' => new BlogResource($blog),
            'availableTags' => BlogTagResource::collection($availableTags),
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
