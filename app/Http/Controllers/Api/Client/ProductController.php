<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCategoryResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    protected const CACHE_TAG = 'client_products';
    protected const CACHE_PREFIX_CLIENT = 'client_products_';

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
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'index_' . md5(json_encode($request->query()));
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();
        $products = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(10),
            function () use ($request) {
                $perPage = $request->query('perPage', 10);
                $search = $request->query('search');
                $sortBy = $request->query('sortBy', 'favorite');
                $sortOrder = $request->query('sortOrder', 'desc');

                return Product::where('is_active', true)
                    ->when($search, function (Builder $query, $search) {
                        $query->where('title', 'like', '%' . $search . '%');
                    })
                    ->orderBy($sortBy, $sortOrder)
                    ->paginate($perPage);
            }
        );

        return $products;
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
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'show_' . $slug;
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();
        $responseContent = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(60),
            function () use ($slug) {
                $product = Product::with('categories')
                    ->where('slug', $slug)
                    ->where('is_active', true)
                    ->first();

                if (!$product) {
                    return null;
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

                return [
                    'product' => new ProductResource($product),
                    'related_products' => ProductResource::collection($relatedProducts),
                ];
            }
        );

        if ($responseContent === null) {
            return response()->json(['message' => 'Product not found or not active.'], 404);
        }

        // The cached content will contain resource instances, which Laravel will re-serialize
        return response()->json($responseContent);
    }

    /**
     * List active products by a specific set of IDs.
     * GET /api/client/products/by-ids?ids[]=1&ids[]=2&ids[]=3
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function byIds(Request $request)
    {
        $ids = $request->query('ids');

        if (!is_array($ids) || empty($ids)) {
            return ProductResource::collection(collect());
        }

        sort($ids);
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'by_ids_' . implode('_', $ids);
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $products = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(60),
            function () use ($ids) {
                return Product::where('is_active', true)
                    ->whereIn('id', $ids)
                    ->orderByRaw('FIELD(id, ' . implode(',', $ids) . ')')
                    ->get();
            }
        );

        return ProductResource::collection($products);
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
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'category_products_' . $categorySlug . '_' . md5(json_encode($request->query()));
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();
        $responseContent = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(10),
            function () use ($request, $categorySlug) {
                $category = ProductCategory::where('slug', $categorySlug)
                    ->where('is_active', true)
                    ->first();

                if (!$category) {
                    return null;
                }

                $perPage = $request->query('perPage', 10);
                $search = $request->query('search');

                $products = $category->products()
                    ->where('is_active', true)
                    ->when($search, function (Builder $query, $search) {
                        $query->where('title', 'like', '%' . $search . '%');
                    })
                    ->orderBy('favorite', 'desc')
                    ->orderBy('created_at', 'desc')
                    ->paginate($perPage);

                return [
                    'category' => new ProductCategoryResource($category),
                    'products' => ProductResource::collection($products)->response()->getData(true)
                ];
            }
        );

        if ($responseContent === null) {
            return response()->json(['message' => 'Product category not found or not active.'], 404);
        }

        return response()->json($responseContent);
    }

    /**
     * GET /api/client/product-categories
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function listAllActiveCategories()
    {
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'all_categories';
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();
        $categories = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(60),
            function () {
                return ProductCategory::where('is_active', true)
                    ->orderBy('title', 'asc')
                    ->get();
            }
        );
        return ProductCategoryResource::collection($categories);
    }
}
