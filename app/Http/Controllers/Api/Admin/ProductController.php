<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Http\Requests\Admin\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCategoryResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:manage products'),
        ];
    }

    public function index(Request $request)
    {
        $products = Product::with('categories')
            ->orderBy($request->query('sortBy', 'title'), $request->query('sortOrder', 'asc'))
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->query('search') . '%');
            })
            ->paginate($request->query('perPage', 10));

        return Inertia::render('Product/Index', [
            'products' => ProductResource::collection($products),
            'filters' => $request->only(['search', 'sortBy', 'sortOrder', 'perPage']),
        ]);
    }

    public function create()
    {
        $productCategories = ProductCategory::where('is_active', true)->select('id', 'title')->get();

        return Inertia::render('Product/Create', [
            'availableCategories' => ProductCategoryResource::collection($productCategories),
        ]);
    }

    public function store(ProductRequest $request)
    {
        $productData = $request->validated();

        $productData['specifications'] = json_encode($productData['specifications'] ?? []);
        $productData['images'] = json_encode($productData['images'] ?? []);

        $productData['created_by'] = Auth::check() ? Auth::user()->email : null;
        $productData['updated_by'] = Auth::check() ? Auth::user()->email : null;

        $product = Product::create($productData);

        if ($request->has('category_ids')) {
            $product->categories()->sync($request->input('category_ids'));
        }

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully!');
    }

    public function show(Product $product)
    {
        $product->load('categories');
        return new ProductResource($product);
    }

    public function edit(Product $product)
    {
        $product->load('categories');
        $availableCategories = ProductCategory::where('is_active', true)->select('id', 'title')->get();

        return Inertia::render('Product/Edit', [
            'product' => new ProductResource($product),
            'availableCategories' => ProductCategoryResource::collection($availableCategories),
        ]);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $productData = $request->validated();

        $productData['specifications'] = json_encode($productData['specifications'] ?? []);
        $productData['images'] = json_encode($productData['images'] ?? []);

        $productData['updated_by'] = Auth::check() ? Auth::user()->email : null;

        $product->update($productData);

        if ($request->has('category_ids')) {
            $product->categories()->sync($request->input('category_ids'));
        } else {
            $product->categories()->detach();
        }

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully!');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully!');
    }
}
