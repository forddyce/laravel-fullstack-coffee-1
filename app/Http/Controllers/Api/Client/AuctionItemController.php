<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\AuctionItem;
use App\Http\Resources\AuctionItemResource;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class AuctionItemController extends Controller
{
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
        $perPage = $request->query('perPage', 10);
        $search = $request->query('search');

        $auctionItems = AuctionItem::where('is_active', true)
            ->when($search, function (Builder $query, $search) {
                $query->where('title', 'like', '%' . $search . '%');
            })
            ->orderBy('title', 'asc')
            ->paginate($perPage);

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
        $auctionItem = AuctionItem::where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$auctionItem) {
            return response()->json(['message' => 'Auction item not found or not active.'], 404);
        }

        return new AuctionItemResource($auctionItem);
    }
}
