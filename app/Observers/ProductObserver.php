<?php

namespace App\Observers;

use App\Models\Product;
use Illuminate\Support\Facades\Cache;

defined('CACHE_TAGS_AVAILABLE') || define('CACHE_TAGS_AVAILABLE', env('CACHE_DRIVER') === 'redis' || env('CACHE_DRIVER') === 'memcached');

class ProductObserver
{
    protected const CACHE_TAG = 'client_products';
    protected const CACHE_PREFIX_CLIENT = 'client_products_';

    protected function clearProductCaches(): void
    {
        if (CACHE_TAGS_AVAILABLE) {
            Cache::tags(self::CACHE_TAG)->flush();
        } else {
            Cache::flush(); // Most common solution for file driver with dynamic lists
        }
    }

    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product): void
    {
        $this->clearProductCaches();
    }

    /**
     * Handle the Product "updated" event.
     */
    public function updated(Product $product): void
    {
        $this->clearProductCaches();
        if (!CACHE_TAGS_AVAILABLE) {
            Cache::forget(self::CACHE_PREFIX_CLIENT . 'show_' . $product->slug);
        }
    }

    /**
     * Handle the Product "deleted" event.
     */
    public function deleted(Product $product): void
    {
        $this->clearProductCaches();
        if (!CACHE_TAGS_AVAILABLE) {
            Cache::forget(self::CACHE_PREFIX_CLIENT . 'show_' . $product->slug);
        }
    }

    /**
     * Handle the Product "restored" event.
     */
    public function restored(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "force deleted" event.
     */
    public function forceDeleted(Product $product): void
    {
        //
    }
}
