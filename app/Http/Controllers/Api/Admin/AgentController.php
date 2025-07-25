<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use App\Http\Requests\Admin\AgentRequest;
use App\Http\Resources\AgentResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Cache;

class AgentController extends Controller implements HasMiddleware
{
    protected const CACHE_TAG = 'agents';
    protected const CACHE_PREFIX_ADMIN = 'admin_agents_';

    public static function middleware(): array
    {
        return [];
    }

    public function index(Request $request)
    {
        $cacheKey = self::CACHE_PREFIX_ADMIN . 'index_' . md5(json_encode($request->query()));
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();
        $agents = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(5),
            function () use ($request) {
                return Agent::orderBy($request->query('sortBy', 'title'), $request->query('sortOrder', 'asc'))
                    ->when($request->filled('search'), function ($query) use ($request) {
                        $query->where('title', 'like', '%' . $request->query('search') . '%');
                    })
                    ->paginate($request->query('perPage', 10));
            }
        );

        return Inertia::render('Agent/Index', [
            'agents' => AgentResource::collection($agents),
            'filters' => $request->only(['search', 'sortBy', 'sortOrder', 'perPage']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Agent/Create');
    }

    public function store(AgentRequest $request)
    {
        $agentData = $request->validated();
        Agent::create($agentData);
        return redirect()->route('admin.agents.index')->with('success', 'Agent created successfully!');
    }

    public function show(Agent $agent)
    {
        $cacheKey = self::CACHE_PREFIX_ADMIN . 'show_' . $agent->id;
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $agent = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(10),
            function () use ($agent) {
                return $agent;
            }
        );

        return new AgentResource($agent);
    }

    public function edit(Agent $agent)
    {
        return Inertia::render('Agent/Edit', [
            'agent' => new AgentResource($agent),
        ]);
    }

    public function update(AgentRequest $request, Agent $agent)
    {
        $agentData = $request->validated();
        $agent->update($agentData);
        return redirect()->route('admin.agents.index')->with('success', 'Agent updated successfully!');
    }

    public function destroy(Agent $agent)
    {
        $agent->delete();
        return redirect()->route('admin.agents.index')->with('success', 'Agent deleted successfully!');
    }
}
