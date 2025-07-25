<?php

namespace App\Providers;

use App\Models\Agent;
use App\Observers\AgentObserver;
use App\Models\AuctionItem;
use App\Observers\AuctionItemObserver;
use App\Models\Blog;
use App\Models\BlogTag;
use App\Observers\BlogObserver;
use App\Observers\BlogTagObserver;
use App\Models\Product;
use App\Observers\ProductObserver;
use App\Models\ProductCategory;
use App\Observers\ProductCategoryObserver;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Http\Resources\Json\JsonResource;

defined('CACHE_TAGS_AVAILABLE') || define('CACHE_TAGS_AVAILABLE', env('CACHE_DRIVER') === 'redis' || env('CACHE_DRIVER') === 'memcached');

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Authenticate::redirectUsing(function ($request) {
            return route('admin.login');
        });

        Agent::observe(AgentObserver::class);
        AuctionItem::observe(AuctionItemObserver::class);
        Blog::observe(BlogObserver::class);
        BlogTag::observe(BlogTagObserver::class);
        Product::observe(ProductObserver::class);
        ProductCategory::observe(ProductCategoryObserver::class);

        JsonResource::withoutWrapping();
    }
}
