<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCategoryResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class ProductController extends Controller
{
    /**
     * List active products with pagination and optional search by title.
     * GET /api/client/products
     * Query Parameters: ?page={page}&perPage={per_page}&search={title_keyword}&sortBy={favorite|created_at}&sortOrder={asc|desc}
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $perPage = $request->query('perPage', 10);
        $search = $request->query('search');
        $sortBy = $request->query('sortBy', 'favorite');
        $sortOrder = $request->query('sortOrder', 'desc');

        $products = Product::where('is_active', true)
            ->when($search, function (Builder $query, $search) {
                $query->where('title', 'like', '%' . $search . '%');
            })
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage);

        return ProductResource::collection($products);
    }

    /**
     * Retrieve a single product by its slug, and include 3 related products.
     * Related products are based on categories and ordered by 'favorite' then 'created_at'.
     * GET /api/client/products/{slug}
     *
     * @param  string  $slug
     * @return \App\Http\Resources\ProductResource|\Illuminate\Http\JsonResponse
     */
    public function show(string $slug)
    {
        $product = Product::with('categories')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found or not active.'], 404);
        }

        $relatedProducts = collect();
        if ($product->categories->isNotEmpty()) {
            $relatedProducts = Product::where('is_active', true)
                ->where('id', '!=', $product->id)
                ->whereHas('categories', function (Builder $query) use ($product) {
                    $query->whereIn('product_categories.id', $product->categories->pluck('id'));
                })
                ->orderBy('favorite', 'desc')
                ->orderBy('created_at', 'desc')
                ->take(3)
                ->get();
        }

        return response()->json([
            'product' => new ProductResource($product),
            'related_products' => ProductResource::collection($relatedProducts),
        ]);
    }

    /**
     * List active products related to a specific category with pagination.
     * GET /api/client/product-categories/{slug}/products
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $categorySlug
     * @return \Illuminate\Http\JsonResponse
     */
    public function productsByCategory(Request $request, string $categorySlug)
    {
        $category = ProductCategory::where('slug', $categorySlug)
            ->where('is_active', true)
            ->first();

        if (!$category) {
            return response()->json(['message' => 'Product category not found or not active.'], 404);
        }

        $perPage = $request->query('perPage', 10);

        $products = $category->products()
            ->where('is_active', true)
            ->orderBy('favorite', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json([
            'category' => new ProductCategoryResource($category),
            'products' => ProductResource::collection($products)->response()->getData(true)
        ]);
    }
}
