<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Exception;

class InstagramController extends Controller
{
    /**
     * Fetch the latest 6 images from Instagram for the client app.
     * GET /api/client/instagram/latest
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function latestImages(): JsonResponse
    {
        $accessToken = config('services.instagram.access_token');
        $baseUrl = config('services.instagram.base_url');
        $userId = 'me';

        if (!$accessToken) {
            Log::error('Instagram access token not configured in services.php.');
            return response()->json(['message' => 'Instagram API not configured.'], 500);
        }

        $cacheKey = 'instagram_latest_images';
        $cacheStore = defined('CACHE_TAGS_AVAILABLE') && CACHE_TAGS_AVAILABLE ? Cache::tags('instagram') : Cache::getFacadeRoot();

        $images = $cacheStore->remember($cacheKey, now()->addMinutes(60), function () use ($accessToken, $baseUrl, $userId) {
            try {
                $response = Http::get("{$baseUrl}{$userId}/media", [
                    'fields' => 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp',
                    'access_token' => $accessToken,
                    'limit' => 6,
                ]);

                $response->throw();

                $media = $response->json('data');

                if (empty($media)) {
                    return [];
                }

                return collect($media)->filter(function ($item) {
                    return in_array($item['media_type'], ['IMAGE', 'CAROUSEL_ALBUM']);
                })->take(6)->map(function ($item) {
                    return [
                        'id' => $item['id'],
                        'url' => $item['media_url'],
                        'thumbnail_url' => $item['thumbnail_url'] ?? $item['media_url'],
                        'permalink' => $item['permalink'],
                        'caption' => $item['caption'] ?? '',
                        'timestamp' => $item['timestamp'],
                    ];
                })->all();
            } catch (\Illuminate\Http\Client\RequestException $e) {
                Log::error("Instagram API error: " . $e->getMessage() . " Response: " . $e->response->body());
                return null;
            } catch (Exception $e) {
                Log::error("General Instagram fetch error: " . $e->getMessage());
                return null;
            }
        });

        if ($images === null) {
            return response()->json(['message' => 'Failed to retrieve Instagram images.'], 500);
        }

        return response()->json(['data' => $images]);
    }
}
