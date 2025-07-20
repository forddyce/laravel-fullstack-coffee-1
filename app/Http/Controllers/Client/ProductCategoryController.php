<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Client\ProductController as ApiProductController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductCategoryController extends Controller
{
    protected ApiProductController $apiProductController;

    public function __construct(ApiProductController $apiProductController)
    {
        $this->apiProductController = $apiProductController;
    }

    public function show(string $slug, Request $request): Response
    {
        $apiResponse = $this->apiProductController->productsByCategory($request, $slug);
        $categoryData = $apiResponse->getData(true);

        if (isset($categoryData['message']) && $categoryData['message'] === 'Product category not found or not active.') {
            abort(404, $categoryData['message']);
        }

        return Inertia::render('Product/Category/Show', [
            'category' => $categoryData['category'],
            'products' => $categoryData['products']['data'],
            'paginationLinks' => $categoryData['products']['links'],
            'paginationMeta' => $categoryData['products']['meta'],
            'filters' => $request->only(['page', 'perPage']),
        ])->rootView('front');
    }
}
