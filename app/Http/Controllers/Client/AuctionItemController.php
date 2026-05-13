<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Client\AuctionItemController as ApiAuctionItemController;
use Inertia\Inertia;
use Inertia\Response;

class AuctionItemController extends Controller
{
    protected ApiAuctionItemController $apiAuctionItemController;

    public function __construct(ApiAuctionItemController $apiAuctionItemController)
    {
        $this->apiAuctionItemController = $apiAuctionItemController;
    }

    public function index()
    {
        return Inertia::render('AuctionItem/Index')->rootView('front');
    }

    public function indexBySeason(string $seasonSlug): Response
    {
        return Inertia::render('AuctionItem/Index', [
            'seasonSlug' => $seasonSlug,
        ])->rootView('front');
    }

    public function show(string $slug): Response
    {
        $apiResponse = $this->apiAuctionItemController->show($slug);
        $data = $apiResponse->getData(true);

        if ($apiResponse->getStatusCode() !== 200) {
            abort($apiResponse->getStatusCode(), $data['message'] ?? 'Not Found');
        }

        return Inertia::render('AuctionItem/Show', [
            'auctionItem' => $data['data'],
        ])->rootView('front');
    }
}
