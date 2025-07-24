<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Client\AuctionItemController as ApiAuctionItemController;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;

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

    public function show(string $slug): Response
    {
        $apiResponse = $this->apiAuctionItemController->show($slug);
        if ($apiResponse instanceof JsonResponse) {
            $errorData = $apiResponse->getData(true);
            abort($apiResponse->getStatusCode(), $errorData['message'] ?? 'Not Found');
        }

        $auctionItemData = $apiResponse->toArray(request());

        return Inertia::render('AuctionItem/Show', [
            'auctionItem' => $auctionItemData,
        ])->rootView('front');
    }
}
