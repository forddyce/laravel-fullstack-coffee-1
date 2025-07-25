<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use App\Http\Resources\AgentResource;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    protected const CACHE_TAG = 'client_agents';
    protected const CACHE_PREFIX_CLIENT = 'client_agents_';

    /**
     * List all active agents.
     * GET /api/client/agents
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $cacheKey = self::CACHE_PREFIX_CLIENT . 'all_active';

        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $agents = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(60),
            function () {
                return Agent::where('is_active', true)
                    ->orderBy('title', 'asc')
                    ->get();
            }
        );

        return AgentResource::collection($agents);
    }
}
