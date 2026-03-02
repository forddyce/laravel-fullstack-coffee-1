<?php

namespace App\Observers;

use App\Models\Season;
use Illuminate\Support\Facades\Cache;

class SeasonObserver
{
    protected const CACHE_TAG = 'seasons';

    protected function clearSeasonCaches(): void
    {
        if (CACHE_TAGS_AVAILABLE) {
            Cache::tags(self::CACHE_TAG)->flush();
            Cache::tags('auction_items')->flush();
            Cache::tags('client_auction_items')->flush();
        } else {
            Cache::flush();
        }
    }

    public function created(Season $season): void
    {
        $this->clearSeasonCaches();
    }

    public function updated(Season $season): void
    {
        $this->clearSeasonCaches();
    }

    public function deleted(Season $season): void
    {
        $this->clearSeasonCaches();
    }

    public function restored(Season $season): void
    {
        //
    }

    public function forceDeleted(Season $season): void
    {
        //
    }
}
