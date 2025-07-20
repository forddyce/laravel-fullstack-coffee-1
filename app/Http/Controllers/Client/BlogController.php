<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Client\BlogController as ApiBlogController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class BlogController extends Controller
{
    protected ApiBlogController $apiBlogController;

    public function __construct(ApiBlogController $apiBlogController)
    {
        $this->apiBlogController = $apiBlogController;
    }

    public function index(Request $request): Response
    {
        $apiResponse = $this->apiBlogController->index($request);
        $blogsData = $apiResponse->toArray($request);

        return Inertia::render('Blog/Index', [
            'blogs' => $blogsData['data'],
            'paginationLinks' => $blogsData['links'],
            'paginationMeta' => $blogsData['meta'],
            'filters' => $request->only(['search', 'page', 'perPage']),
        ])->rootView('front');
    }

    public function show(string $slug): Response
    {
        $apiResponse = $this->apiBlogController->show($slug);
        $blogData = $apiResponse->getData(true);

        if (isset($blogData['message']) && $blogData['message'] === 'Blog post not found or not published.') {
            abort(404, $blogData['message']);
        }

        return Inertia::render('Blog/Show', [
            'blog' => $blogData['blog'],
            'relatedBlogs' => $blogData['related_blogs'],
        ])->rootView('front');
    }

    public function redirectToNewSlug(string $id, string $slug): RedirectResponse
    {
        return redirect()->route('client.blogs.show', $slug)->setStatusCode(301);
    }
}
