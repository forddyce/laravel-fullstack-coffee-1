<?php

namespace App\Observers;

use App\Models\AuctionItem;
use Illuminate\Support\Facades\Cache;

class AuctionItemObserver
{
    protected const CACHE_TAG = 'auction_items';
    protected const CACHE_PREFIX_ADMIN = 'admin_auction_items_';
    protected const CACHE_PREFIX_CLIENT = 'client_auction_items_';

    protected function clearAuctionItemCaches(AuctionItem $auctionItem = null): void
    {
        if (CACHE_TAGS_AVAILABLE) {
            Cache::tags(self::CACHE_TAG)->flush();
        } else {
            if ($auctionItem) {
                Cache::forget(self::CACHE_PREFIX_ADMIN . 'show_' . $auctionItem->id);
                Cache::forget(self::CACHE_PREFIX_CLIENT . 'show_' . $auctionItem->slug);
            }
            Cache::flush();
        }
    }

    /**
     * Handle the AuctionItem "created" event.
     */
    public function created(AuctionItem $auctionItem): void
    {
        $this->clearAuctionItemCaches();
    }

    /**
     * Handle the AuctionItem "updated" event.
     */
    public function updated(AuctionItem $auctionItem): void
    {
        $this->clearAuctionItemCaches($auctionItem);
    }

    /**
     * Handle the AuctionItem "deleted" event.
     */
    public function deleted(AuctionItem $auctionItem): void
    {
        $this->clearAuctionItemCaches($auctionItem);
    }

    /**
     * Handle the AuctionItem "restored" event.
     */
    public function restored(AuctionItem $auctionItem): void
    {
        //
    }

    /**
     * Handle the AuctionItem "force deleted" event.
     */
    public function forceDeleted(AuctionItem $auctionItem): void
    {
        //
    }
}
