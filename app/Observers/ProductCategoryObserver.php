<?php

namespace App\Observers;

use App\Models\ProductCategory;
use Illuminate\Support\Facades\Cache;

class ProductCategoryObserver
{
    protected const CACHE_TAG = 'product_categories';
    protected const CACHE_TAG_CLIENT_PRODUCTS = 'client_products';

    protected const CACHE_PREFIX_ADMIN = 'admin_product_categories_';
    protected const CACHE_PREFIX_CLIENT = 'client_products_';

    protected function clearProductCategoryCaches(ProductCategory $productCategory = null): void
    {
        if (CACHE_TAGS_AVAILABLE) {
            Cache::tags(self::CACHE_TAG)->flush();
            Cache::tags(self::CACHE_TAG_CLIENT_PRODUCTS)->flush();
        } else {
            if ($productCategory) {
                Cache::forget(self::CACHE_PREFIX_ADMIN . 'show_' . $productCategory->id);
                Cache::forget(self::CACHE_PREFIX_CLIENT . 'category_products_' . $productCategory->slug . '_*');
            }
            Cache::forget(self::CACHE_PREFIX_CLIENT . 'all_categories');
            Cache::flush();
        }
    }

    /**
     * Handle the ProductCategory "created" event.
     */
    public function created(ProductCategory $productCategory): void
    {
        $this->clearProductCategoryCaches();
    }

    /**
     * Handle the ProductCategory "updated" event.
     */
    public function updated(ProductCategory $productCategory): void
    {
        $this->clearProductCategoryCaches($productCategory);
    }

    /**
     * Handle the ProductCategory "deleted" event.
     */
    public function deleted(ProductCategory $productCategory): void
    {
        $this->clearProductCategoryCaches($productCategory);
    }

    /**
     * Handle the ProductCategory "restored" event.
     */
    public function restored(ProductCategory $productCategory): void
    {
        //
    }

    /**
     * Handle the ProductCategory "force deleted" event.
     */
    public function forceDeleted(ProductCategory $productCategory): void
    {
        //
    }
}
