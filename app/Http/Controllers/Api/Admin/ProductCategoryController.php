<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use App\Http\Requests\Admin\ProductCategoryRequest;
use App\Http\Resources\ProductCategoryResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;

class ProductCategoryController extends Controller implements HasMiddleware
{
    protected const CACHE_TAG = 'product_categories';
    protected const CACHE_PREFIX_ADMIN = 'admin_product_categories_';

    public static function middleware(): array
    {
        return [
            new Middleware('permission:manage product categories'),
        ];
    }

    public function index(Request $request)
    {
        $cacheKey = self::CACHE_PREFIX_ADMIN . 'index_' . md5(json_encode($request->query()));
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $productCategories = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(5),
            function () use ($request) {
                return ProductCategory::orderBy($request->query('sortBy', 'title'), $request->query('sortOrder', 'asc'))
                    ->when($request->filled('search'), function ($query) use ($request) {
                        $query->where('title', 'like', '%' . $request->query('search') . '%');
                    })
                    ->paginate($request->query('perPage', 10));
            }
        );

        return Inertia::render('ProductCategory/Index', [
            'productCategories' => ProductCategoryResource::collection($productCategories),
            'filters' => $request->only(['search', 'sortBy', 'sortOrder', 'perPage']),
        ]);
    }

    public function create()
    {
        return Inertia::render('ProductCategory/Create');
    }

    public function store(ProductCategoryRequest $request)
    {
        ProductCategory::create($request->validated());

        return redirect()->route('admin.product-categories.index')->with('success', 'Product Category created successfully!');
    }

    public function show(ProductCategory $productCategory)
    {
        $cacheKey = self::CACHE_PREFIX_ADMIN . 'show_' . $productCategory->id;
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $productCategory = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(10),
            function () use ($productCategory) {
                return $productCategory;
            }
        );

        return new ProductCategoryResource($productCategory);
    }

    public function edit(ProductCategory $productCategory)
    {
        return Inertia::render('ProductCategory/Edit', [
            'productCategory' => new ProductCategoryResource($productCategory),
        ]);
    }

    public function update(ProductCategoryRequest $request, ProductCategory $productCategory)
    {
        $productCategory->update($request->validated());

        return redirect()->route('admin.product-categories.index')->with('success', 'Product Category updated successfully!');
    }

    public function destroy(ProductCategory $productCategory)
    {
        if ($productCategory->products()->exists()) {
            return redirect()->back()->with('error', 'Cannot delete category: products are linked to it.');
        }

        $productCategory->delete();

        return redirect()->route('admin.product-categories.index')->with('success', 'Product Category deleted successfully!');
    }
}
