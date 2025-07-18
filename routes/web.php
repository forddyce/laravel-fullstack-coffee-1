<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\BlogTagController;
use App\Http\Controllers\Api\Admin\BlogController;
use App\Http\Controllers\Api\Admin\ProductCategoryController;
use App\Http\Controllers\Api\Admin\ProductController;
use App\Http\Controllers\Api\Admin\AgentController;
use App\Http\Controllers\Api\Admin\AuctionItemController;

Route::get('/', function () {
    return Inertia::render('front/pages/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ])->rootView('front');
})->name('home');

Route::post('logout', [LogoutController::class, 'store'])->middleware('auth')->name('logout');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store']);

    Route::middleware(['auth'])->group(function () {
        Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['permission:manage blogs|manage products']], function () {
            \UniSharp\LaravelFilemanager\Lfm::routes();
        });

        Route::get('/', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::prefix('settings')->name('settings.')->group(function () {
            Route::get('/', function () {
                return Inertia::render('Settings');
            })->name('index');
            Route::get('/password', [ProfileController::class, 'editPassword'])->name('password');
            Route::put('/password', [ProfileController::class, 'updatePassword'])->name('password.update');
        });

        Route::middleware('permission:manage users')->group(function () {
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
            Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
            Route::resource('users', UserController::class);
        });

        Route::middleware('permission:manage blog tags')->group(function () {
            Route::get('/blog-tags', [BlogTagController::class, 'index'])->name('blog-tags.index');
            Route::get('/blog-tags/create', [BlogTagController::class, 'create'])->name('blog-tags.create');
            Route::get('/blog-tags/{blog_tag}/edit', [BlogTagController::class, 'edit'])->name('blog-tags.edit');
            Route::resource('blog-tags', BlogTagController::class);
        });

        Route::middleware('permission:manage blog posts')->group(function () {
            Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
            Route::get('/blogs/create', [BlogController::class, 'create'])->name('blogs.create');
            Route::get('/blogs/{blog}/edit', [BlogController::class, 'edit'])->name('blogs.edit');
            Route::resource('blogs', BlogController::class);
        });

        Route::middleware('permission:manage product categories')->group(function () {
            Route::get('/product-categories', [ProductCategoryController::class, 'index'])->name('product-categories.index');
            Route::get('/product-categories/create', [ProductCategoryController::class, 'create'])->name('product-categories.create');
            Route::get('/product-categories/{product_category}/edit', [ProductCategoryController::class, 'edit'])->name('product-categories.edit');
            Route::resource('product-categories', ProductCategoryController::class);
        });

        Route::middleware('permission:manage products')->group(function () {
            Route::get('/products', [ProductController::class, 'index'])->name('products.index');
            Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
            Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
            Route::resource('products', ProductController::class);
        });

        Route::get('/agents', [AgentController::class, 'index'])->name('agents.index');
        Route::get('/agents/create', [AgentController::class, 'create'])->name('agents.create');
        Route::get('/agents/{agent}/edit', [AgentController::class, 'edit'])->name('agents.edit');
        Route::resource('agents', AgentController::class);

        Route::get('/auction-items', [AuctionItemController::class, 'index'])->name('auction-items.index');
        Route::get('/auction-items/create', [AuctionItemController::class, 'create'])->name('auction-items.create');
        Route::get('/auction-items/{auction_item}/edit', [AuctionItemController::class, 'edit'])->name('auction-items.edit');
        Route::resource('auction-items', AuctionItemController::class);
    });
});
