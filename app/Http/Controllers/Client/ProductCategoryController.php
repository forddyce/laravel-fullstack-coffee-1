<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Client\ProductController as ApiProductController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;

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

        return Inertia::render('Product/Category/Index', [
            'category' => $categoryData['category'],
            'products' => [
                'data' => $categoryData['products']['data'],
                'links' => $categoryData['products']['links'],
                'meta' => $categoryData['products']['meta']
            ],
            'filters' => $request->only(['page', 'perPage', 'search']),
        ])->rootView('front');
    }
}
