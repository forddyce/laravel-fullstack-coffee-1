<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Season;
use App\Http\Resources\SeasonResource;
use Illuminate\Support\Facades\Cache;

class SeasonController extends Controller
{
    protected const CACHE_TAG = 'seasons';
    protected const CACHE_PREFIX_CLIENT = 'client_seasons_';

    /**
     * List all active seasons ordered by sort_order.
     * GET /api/client/seasons
     */
    public function index()
    {
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'all_active';
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $seasons = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(60),
            function () {
                return Season::where('is_active', true)
                    ->orderBy('sort_order')
                    ->orderBy('title')
                    ->get();
            }
        );

        return SeasonResource::collection($seasons);
    }
}
