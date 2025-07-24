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
            'products' => [
                'data' => $productsData['data'],
                'links' => $productsData['links'],
                'meta' => [
                    'current_page' => $productsData['current_page'],
                    'from' => $productsData['from'],
                    'to' => $productsData['to'],
                    'total' => $productsData['total'],
                    'per_page' => $productsData['per_page'],
                    'links' => $productsData['links'],
                    'path' => $productsData['path'],
                ],
            ],
            'filters' => $request->only(['search', 'page', 'perPage', 'sortBy', 'sortOrder']),
        ])->rootView('front');
    }

    public function show(string $slug): Response
    {
        $apiResponse = $this->apiProductController->show($slug);

        if ($apiResponse instanceof \Illuminate\Http\JsonResponse) {
            $errorData = $apiResponse->getData(true);
            abort($apiResponse->getStatusCode(), $errorData['message'] ?? 'Not Found');
        }

        $productData = $apiResponse->toArray(request());
        $relatedProductsData = $productData['related_products']->toArray(request());

        return Inertia::render('Product/Show', [
            'product' => $productData['product'],
            'relatedProducts' => $relatedProductsData['data'],
        ])->rootView('front');
    }

    public function redirectToNewSlug(string $id, string $slug): RedirectResponse
    {
        return redirect()->route('client.products.show', $slug)->setStatusCode(301);
    }
}
