<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Client\AuctionItemController as ApiAuctionItemController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuctionItemController extends Controller
{
    protected ApiAuctionItemController $apiAuctionItemController;

    public function __construct(ApiAuctionItemController $apiAuctionItemController)
    {
        $this->apiAuctionItemController = $apiAuctionItemController;
    }

    public function index(Request $request): Response
    {
        $apiResponse = $this->apiAuctionItemController->index($request);
        $auctionItemsData = $apiResponse->toArray($request);

        return Inertia::render('AuctionItem/Index', [
            'auctionItems' => $auctionItemsData['data'],
            'paginationLinks' => $auctionItemsData['links'],
            'paginationMeta' => $auctionItemsData['meta'],
            'filters' => $request->only(['search', 'page', 'perPage']),
        ])->rootView('front');
    }

    public function show(string $slug): Response
    {
        $apiResponse = $this->apiAuctionItemController->show($slug);
        $auctionItemData = $apiResponse->getData(true);

        if (isset($auctionItemData['message']) && $auctionItemData['message'] === 'Auction item not found or not active.') {
            abort(404, $auctionItemData['message']);
        }

        return Inertia::render('AuctionItem/Show', [
            'auctionItem' => $auctionItemData,
        ])->rootView('front');
    }
}
