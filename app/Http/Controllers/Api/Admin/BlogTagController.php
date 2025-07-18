<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogTag;
use App\Http\Requests\Admin\BlogTagRequest;
use App\Http\Resources\BlogTagResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class BlogTagController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:manage blog tags'),
        ];
    }

    public function index(Request $request)
    {
        $blogTags = BlogTag::orderBy($request->query('sortBy', 'title'), $request->query('sortOrder', 'asc'))
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->query('search') . '%');
            })
            ->paginate($request->query('perPage', 10));

        return Inertia::render('BlogTag/Index', [
            'blogTags' => BlogTagResource::collection($blogTags),
            'filters' => $request->only(['search', 'sortBy', 'sortOrder', 'perPage']),
        ]);
    }

    public function create()
    {
        return Inertia::render('BlogTag/Create');
    }

    public function store(BlogTagRequest $request)
    {
        $blogTag = BlogTag::create($request->validated());

        return redirect()->route('admin.blog-tags.index')->with('success', 'Blog Tag created successfully!');
    }

    public function show(BlogTag $blogTag)
    {
        return new BlogTagResource($blogTag);
    }

    public function edit(BlogTag $blogTag)
    {
        return Inertia::render('BlogTag/Edit', [
            'blogTag' => new BlogTagResource($blogTag),
        ]);
    }

    public function update(BlogTagRequest $request, BlogTag $blogTag)
    {
        $blogTag->update($request->validated());

        return redirect()->route('admin.blog-tags.index')->with('success', 'Blog Tag updated successfully!');
    }

    public function destroy(BlogTag $blogTag)
    {
        $blogTag->delete();

        return redirect()->route('admin.blog-tags.index')->with('success', 'Blog Tag deleted successfully!');
    }
}
