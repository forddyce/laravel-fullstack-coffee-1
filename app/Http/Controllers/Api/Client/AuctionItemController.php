<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\AuctionItem;
use App\Http\Resources\AuctionItemResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;

class AuctionItemController extends Controller
{
    protected const CACHE_TAG = 'client_auction_items';
    protected const CACHE_PREFIX_CLIENT = 'client_auction_items_';

    /**
     * List all active auction items with pagination and optional search by title.
     * GET /api/client/auction-items
     * Query Parameters: ?page={page}&perPage={per_page}&search={title_keyword}
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'index_' . md5(json_encode($request->query()));
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $auctionItems = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(5),
            function () use ($request) {
                $perPage = $request->query('perPage', 10);
                $search = $request->query('search');

                return AuctionItem::where('is_active', true)
                    ->when($search, function (Builder $query, $search) {
                        $query->where('title', 'like', '%' . $search . '%');
                    })
                    ->orderBy('title', 'asc')
                    ->paginate($perPage);
            }
        );

        return AuctionItemResource::collection($auctionItems);
    }

    /**
     * Retrieve a single active auction item by its slug.
     * GET /api/client/auction-items/{slug}
     *
     * @param  string  $slug
     * @return \App\Http\Resources\AuctionItemResource|\Illuminate\Http\JsonResponse
     */
    public function show(string $slug)
    {
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'show_' . $slug;
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $auctionItem = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(60),
            function () use ($slug) {
                return AuctionItem::where('slug', $slug)
                    ->where('is_active', true)
                    ->first();
            }
        );

        if (!$auctionItem) {
            return response()->json(['message' => 'Auction item not found or not active.'], 404);
        }

        return new AuctionItemResource($auctionItem);
    }
}
