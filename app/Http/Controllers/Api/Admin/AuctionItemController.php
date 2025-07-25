<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuctionItem;
use App\Http\Requests\Admin\AuctionItemRequest;
use App\Http\Resources\AuctionItemResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Cache;

class AuctionItemController extends Controller implements HasMiddleware
{
    protected const CACHE_TAG = 'auction_items';
    protected const CACHE_PREFIX_ADMIN = 'admin_auction_items_';

    public static function middleware(): array
    {
        return [];
    }

    public function index(Request $request)
    {
        $cacheKey = self::CACHE_PREFIX_ADMIN . 'index_' . md5(json_encode($request->query()));
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $auctionItems = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(5),
            function () use ($request) {
                return AuctionItem::orderBy($request->query('sortBy', 'title'), $request->query('sortOrder', 'asc'))
                    ->when($request->filled('search'), function ($query) use ($request) {
                        $query->where('title', 'like', '%' . $request->query('search') . '%');
                    })
                    ->paginate($request->query('perPage', 10));
            }
        );

        return Inertia::render('AuctionItem/Index', [
            'auctionItems' => AuctionItemResource::collection($auctionItems),
            'filters' => $request->only(['search', 'sortBy', 'sortOrder', 'perPage']),
        ]);
    }

    public function create()
    {
        return Inertia::render('AuctionItem/Create');
    }

    public function store(AuctionItemRequest $request)
    {
        $itemData = $request->validated();
        $itemData['info'] = json_encode($itemData['info'] ?? []);
        AuctionItem::create($itemData);
        return redirect()->route('admin.auction-items.index')->with('success', 'Auction Item created successfully!');
    }

    public function show(AuctionItem $auctionItem)
    {
        $cacheKey = self::CACHE_PREFIX_ADMIN . 'show_' . $auctionItem->id;
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $auctionItem = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(10),
            function () use ($auctionItem) {
                return $auctionItem;
            }
        );

        return new AuctionItemResource($auctionItem);
    }

    public function edit(AuctionItem $auctionItem)
    {
        return Inertia::render('AuctionItem/Edit', [
            'auctionItem' => new AuctionItemResource($auctionItem),
        ]);
    }

    public function update(AuctionItemRequest $request, AuctionItem $auctionItem)
    {
        $itemData = $request->validated();
        $itemData['info'] = json_encode($itemData['info'] ?? []);
        $auctionItem->update($itemData);
        return redirect()->route('admin.auction-items.index')->with('success', 'Auction Item updated successfully!');
    }

    public function destroy(AuctionItem $auctionItem)
    {
        $auctionItem->delete();

        return redirect()->route('admin.auction-items.index')->with('success', 'Auction Item deleted successfully!');
    }
}
