<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\Client\BlogController;
use App\Http\Controllers\Client\ProductController;
use App\Http\Controllers\Client\AuctionItemController;
use App\Http\Controllers\Client\ProductCategoryController;
use App\Http\Controllers\Client\BlogTagController;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\Admin\BlogTagController as AdminBlogTagController;
use App\Http\Controllers\Api\Admin\BlogController as AdminBlogController;
use App\Http\Controllers\Api\Admin\ProductCategoryController as AdminProductCategoryController;
use App\Http\Controllers\Api\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\Admin\AgentController as AdminAgentController;
use App\Http\Controllers\Api\Admin\AuctionItemController as AdminAuctionItemController;

Route::name('client.')->group(function () {

    Route::redirect('/member/roast-calculator', '/roi-calculator', 301);
    Route::get('/blog/{id}/{slug}', [BlogController::class, 'redirectToNewSlug'])->name('blogs.old_show');
    Route::get('/product/{id}/{slug}', [ProductController::class, 'redirectToNewSlug'])->name('products.old_show');

    Route::get('/', [HomeController::class, 'index'])->name('home');

    Route::get('/blog', [BlogController::class, 'index'])->name('blogs.index');
    Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blogs.show');
    Route::get('/blog-tag/{slug}', [BlogTagController::class, 'show'])->name('blog-tags.show');

    Route::get('/product-catalog', [ProductController::class, 'index'])->name('products.index');
    Route::get('/product/{slug}', [ProductController::class, 'show'])->name('products.show');
    Route::get('/product-category/{slug}', [ProductCategoryController::class, 'show'])->name('product-categories.show');

    Route::get('/collaborations', [AuctionItemController::class, 'index'])->name('auction-items.index');
    Route::get('/collaboration/{slug}', [AuctionItemController::class, 'show'])->name('auction-items.show');

    Route::get('/about-us', function () {
        return Inertia::render('About/Index')->rootView('front');
    })->name('static.about-us');

    Route::get('our-factory', function () {
        return Inertia::render('About/Factory')->rootView('front');
    })->name('static.our-factory');

    Route::get('our-technician', function () {
        return Inertia::render('About/Technician')->rootView('front');
    })->name('static.our-technician');

    Route::get('/coffee-lab', function () {
        return Inertia::render('Menu/CoffeeLab')->rootView('front');
    })->name('static.coffee-lab');

    Route::get('/roast-and-brew', function () {
        return Inertia::render('Menu/RoastAndBrew')->rootView('front');
    })->name('static.roast-and-brew');

    Route::get('/we-coffee-academy', function () {
        return Inertia::render('Menu/WECoffeeAcademy')->rootView('front');
    })->name('static.we-coffee-academy');

    Route::get('/faq/w600i-w600i-se', function () {
        return Inertia::render('FAQ/W600')->rootView('front');
    })->name('static.faq.w600i-w600i-se');

    Route::get('/faq/w3100-w3100-ir-w6100-w6100-ir-w12k-ir', function () {
        return Inertia::render('FAQ/W3100')->rootView('front');
    })->name('static.faq.w3100-w3100-ir-w6100-w6100-ir-w12k-ir');

    Route::get('/faq/wexsuji', function () {
        return Inertia::render('FAQ/WExSuji')->rootView('front');
    })->name('static.faq.wexsuji');

    Route::get('/faq/w10-w11', function () {
        return Inertia::render('FAQ/W10')->rootView('front');
    })->name('static.faq.w10-w11');

    Route::get('/faq/w30', function () {
        return Inertia::render('FAQ/W30')->rootView('front');
    })->name('static.faq.w30');

    Route::get('/calculator', function () {
        return Inertia::render('RoastCalculator')->rootView('front');
    })->name('static.calculator');

    Route::get('/contact', function () {
        return Inertia::render('Contact')->rootView('front');
    })->name('static.contact');

    Route::get('/privacy-policy', function () {
        return Inertia::render('Privacy')->rootView('front');
    })->name('static.privacy');
});

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

        Route::resource('users', AdminUserController::class);
        Route::resource('blog-tags', AdminBlogTagController::class);
        Route::resource('blogs', AdminBlogController::class);
        Route::resource('product-categories', AdminProductCategoryController::class);
        Route::resource('products', AdminProductController::class);
        Route::resource('agents', AdminAgentController::class);
        Route::resource('auction-items', AdminAuctionItemController::class);
    });
});
