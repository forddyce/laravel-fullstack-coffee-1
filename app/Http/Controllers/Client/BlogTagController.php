<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Client\BlogController as ApiBlogController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogTagController extends Controller
{
    protected ApiBlogController $apiBlogController;

    public function __construct(ApiBlogController $apiBlogController)
    {
        $this->apiBlogController = $apiBlogController;
    }

    public function show(string $slug, Request $request): Response
    {
        $apiResponse = $this->apiBlogController->blogsByTag($request, $slug);
        $tagData = $apiResponse->getData(true);

        if (isset($tagData['message']) && $tagData['message'] === 'Blog tag not found or not active.') {
            abort(404, $tagData['message']);
        }

        return Inertia::render('Blog/Tag/Show', [
            'tag' => $tagData['tag'],
            'blogs' => $tagData['blogs']['data'],
            'paginationLinks' => $tagData['blogs']['links'],
            'paginationMeta' => $tagData['blogs']['meta'],
            'filters' => $request->only(['page', 'perPage']),
        ])->rootView('front');
    }
}
