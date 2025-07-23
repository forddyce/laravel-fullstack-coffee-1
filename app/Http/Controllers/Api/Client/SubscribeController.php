<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\SubscribeRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Exception;
use NZTim\Mailchimp\MailchimpFacade;

class SubscribeController extends Controller
{
    public function createSub(SubscribeRequest $request): JsonResponse
    {
        $email = $request->input('email');

        try {
            $status = MailchimpFacade::status(config('services.mailchimp.list_id'), $email);

            if ($status === 'subscribed') {
                return response()->json([
                    'type' => 'info',
                    'message' => 'Email already registered.',
                ]);
            }

            $result = MailchimpFacade::subscribe(config('services.mailchimp.list_id'), $email, [], false);

            if ($result) {
                return response()->json([
                    'type' => 'success',
                    'message' => 'Email subscribed successfully!',
                ]);
            } else {
                Log::error("Mailchimp subscribe failed for {$email} without an exception.");
                return response()->json([
                    'type' => 'error',
                    'message' => 'Subscription failed. Please try again.',
                ], 500);
            }
        } catch (Exception $e) {
            Log::error("Mailchimp subscription error for {$email}: " . $e->getMessage());
            return response()->json([
                'type' => 'error',
                'message' => 'A server error occurred during subscription. Please try again later.',
            ], 500);
        }
    }
}
