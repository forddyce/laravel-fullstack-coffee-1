<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Client\ProductController as ApiProductController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ProductController extends Controller
{
    protected ApiProductController $apiProductController;

    public function __construct(ApiProductController $apiProductController)
    {
        $this->apiProductController = $apiProductController;
    }

    public function index(Request $request): Response
    {
        $apiResponse = $this->apiProductController->index($request);
        $productsData = $apiResponse->toArray($request);

        return Inertia::render('Product/Index', [
            'products' => $productsData['data'],
            'paginationLinks' => $productsData['links'],
            'paginationMeta' => $productsData['meta'],
            'filters' => $request->only(['search', 'page', 'perPage', 'sortBy', 'sortOrder']),
        ])->rootView('front');
    }

    public function show(string $slug): Response
    {
        $apiResponse = $this->apiProductController->show($slug);
        $productData = $apiResponse->getData(true);

        if (isset($productData['message']) && $productData['message'] === 'Product not found or not active.') {
            abort(404, $productData['message']);
        }

        return Inertia::render('Product/Show', [
            'product' => $productData['product'],
            'relatedProducts' => $productData['related_products'],
        ])->rootView('front');
    }

    public function redirectToNewSlug(string $id, string $slug): RedirectResponse
    {
        return redirect()->route('client.products.show', $slug)->setStatusCode(301);
    }
}
