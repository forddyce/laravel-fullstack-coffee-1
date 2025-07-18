<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use App\Http\Resources\AgentResource;

class AgentController extends Controller
{
    /**
     * List all active agents.
     * GET /api/client/agents
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $agents = Agent::where('is_active', true)
            ->orderBy('title', 'asc')
            ->get();

        return AgentResource::collection($agents);
    }
}
