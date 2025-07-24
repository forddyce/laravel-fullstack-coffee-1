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
            'blogs' => [
                'data' => $blogsData['data'],
                'links' => $blogsData['links'],
                'meta' => [
                    'current_page' => $blogsData['current_page'],
                    'from' => $blogsData['from'],
                    'to' => $blogsData['to'],
                    'total' => $blogsData['total'],
                    'per_page' => $blogsData['per_page'],
                    'links' => $blogsData['links'],
                    'path' => $blogsData['path'],
                ],
            ],
            'filters' => $request->only(['search', 'page', 'perPage']),
        ])->rootView('front');
    }

    public function show(string $slug): Response
    {
        $apiResponse = $this->apiBlogController->show($slug);
        $blogDataFromApi = $apiResponse->getData(true);

        if (isset($blogDataFromApi['message'])) {
            abort($apiResponse->getStatusCode(), $blogDataFromApi['message']);
        }

        return Inertia::render('Blog/Show', [
            'blog' => $blogDataFromApi['blog'],
            'relatedBlogs' => $blogDataFromApi['related_blogs'],
        ])->rootView('front');
    }

    public function redirectToNewSlug(string $id, string $slug): RedirectResponse
    {
        return redirect()->route('client.blogs.show', $slug)->setStatusCode(301);
    }
}
