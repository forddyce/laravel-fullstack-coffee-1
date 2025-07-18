<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuctionItem;
use App\Http\Requests\Admin\AuctionItemRequest;
use App\Http\Resources\AuctionItemResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;

class AuctionItemController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [];
    }

    public function index(Request $request)
    {
        $auctionItems = AuctionItem::orderBy($request->query('sortBy', 'title'), $request->query('sortOrder', 'asc'))
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->query('search') . '%');
            })
            ->paginate($request->query('perPage', 10));

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
