<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use App\Http\Requests\Admin\AgentRequest;
use App\Http\Resources\AgentResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;

class AgentController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [];
    }

    public function index(Request $request)
    {
        $agents = Agent::orderBy($request->query('sortBy', 'title'), $request->query('sortOrder', 'asc'))
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->query('search') . '%');
            })
            ->paginate($request->query('perPage', 10));

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
