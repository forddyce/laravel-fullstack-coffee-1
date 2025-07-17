<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BlogController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('client')->name('client.')->group(function () {
        Route::get('blogs/latest', [BlogController::class, 'latest'])->name('blogs.latest');
        Route::get('blogs', [BlogController::class, 'index'])->name('blogs.index');
        Route::get('blogs/{slug}', [BlogController::class, 'show'])->name('blogs.show');
        Route::get('blog-tags/{slug}/blogs', [BlogController::class, 'blogsByTag'])->name('blog-tags.blogs');
    });
});
