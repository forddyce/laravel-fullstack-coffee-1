<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Client\BlogController;
use App\Http\Controllers\Api\Client\ProductController;
use App\Http\Controllers\Api\Client\AgentController;
use App\Http\Controllers\Api\Client\AuctionItemController;
use App\Http\Controllers\Api\Client\SubscribeController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::prefix('client')->name('client.')->group(function () {
    Route::get('blogs/latest', [BlogController::class, 'latest'])->name('blogs.latest');
    Route::get('blogs', [BlogController::class, 'index'])->name('blogs.index');
    Route::get('blogs/{slug}', [BlogController::class, 'show'])->name('blogs.show');
    Route::get('blog-tags/{slug}/blogs', [BlogController::class, 'blogsByTag'])->name('blog-tags.blogs');

    Route::get('products', [ProductController::class, 'index'])->name('products.index');
    Route::get('products/{slug}', [ProductController::class, 'show'])->name('products.show');
    Route::get('product-categories/{slug}/products', [ProductController::class, 'productsByCategory'])->name('product-categories.products');

    Route::get('agents', [AgentController::class, 'index'])->name('agents.index');

    Route::get('auction-items', [AuctionItemController::class, 'index'])->name('auction-items.index');
    Route::get('auction-items/{slug}', [AuctionItemController::class, 'show'])->name('auction-items.show');

    Route::post('subscribe', [SubscribeController::class, 'createSub'])->name('subscribe');
});
