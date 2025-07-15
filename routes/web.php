<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\Admin\UserController;

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

        Route::middleware(['auth:sanctum', 'permission:manage users'])->group(function () {
            Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
            Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
            Route::apiResource('users', UserController::class);
        });
    });
});
