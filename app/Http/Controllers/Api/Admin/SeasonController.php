<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Season;
use App\Http\Requests\Admin\SeasonRequest;
use App\Http\Resources\SeasonResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Cache;

class SeasonController extends Controller implements HasMiddleware
{
    protected const CACHE_TAG = 'seasons';
    protected const CACHE_PREFIX_ADMIN = 'admin_seasons_';

    public static function middleware(): array
    {
        return [];
    }

    public function index(Request $request)
    {
        $cacheKey = self::CACHE_PREFIX_ADMIN . 'index_' . md5(json_encode($request->query()));
        $cacheStore = CACHE_TAGS_AVAILABLE ? Cache::tags(self::CACHE_TAG) : Cache::getFacadeRoot();

        $seasons = $cacheStore->remember(
            $cacheKey,
            now()->addMinutes(5),
            function () use ($request) {
                return Season::orderBy($request->query('sortBy', 'sort_order'), $request->query('sortOrder', 'asc'))
                    ->when($request->filled('search'), function ($query) use ($request) {
                        $query->where('title', 'like', '%' . $request->query('search') . '%');
                    })
                    ->paginate($request->query('perPage', 10));
            }
        );

        return Inertia::render('Season/Index', [
            'seasons' => SeasonResource::collection($seasons),
            'filters' => $request->only(['search', 'sortBy', 'sortOrder', 'perPage']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Season/Create');
    }

    public function store(SeasonRequest $request)
    {
        Season::create($request->validated());

        return redirect()->route('admin.seasons.index')->with('success', 'Season created successfully!');
    }

    public function show(Season $season)
    {
        return new SeasonResource($season);
    }

    public function edit(Season $season)
    {
        return Inertia::render('Season/Edit', [
            'season' => new SeasonResource($season),
        ]);
    }

    public function update(SeasonRequest $request, Season $season)
    {
        $season->update($request->validated());

        return redirect()->route('admin.seasons.index')->with('success', 'Season updated successfully!');
    }

    public function destroy(Season $season)
    {
        $season->delete();

        return redirect()->route('admin.seasons.index')->with('success', 'Season deleted successfully!');
    }
}
