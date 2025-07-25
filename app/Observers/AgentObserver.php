<?php

namespace App\Observers;

use App\Models\Agent;
use Illuminate\Support\Facades\Cache;

defined('CACHE_TAGS_AVAILABLE') || define('CACHE_TAGS_AVAILABLE', env('CACHE_DRIVER') === 'redis' || env('CACHE_DRIVER') === 'memcached');

class AgentObserver
{
    protected const CACHE_TAG = 'agents';
    protected const CACHE_PREFIX_ADMIN = 'admin_agents_';
    protected const CACHE_PREFIX_CLIENT = 'client_agents_';

    protected function clearAgentCaches(): void
    {
        if (CACHE_TAGS_AVAILABLE) {
            Cache::tags(self::CACHE_TAG)->flush();
        } else {
            Cache::flush();
        }
    }

    /**
     * Handle the Agent "created" event.
     */
    public function created(Agent $agent): void
    {
        $this->clearAgentCaches();
    }

    /**
     * Handle the Agent "updated" event.
     */
    public function updated(Agent $agent): void
    {
        $this->clearAgentCaches();
        if (!CACHE_TAGS_AVAILABLE) {
            Cache::forget(self::CACHE_PREFIX_ADMIN . 'show_' . $agent->id);
            Cache::forget(self::CACHE_PREFIX_CLIENT . 'show_' . $agent->slug);
        }
    }

    /**
     * Handle the Agent "deleted" event.
     */
    public function deleted(Agent $agent): void
    {
        $this->clearAgentCaches();
        if (!CACHE_TAGS_AVAILABLE) {
            Cache::forget(self::CACHE_PREFIX_ADMIN . 'show_' . $agent->id);
            Cache::forget(self::CACHE_PREFIX_CLIENT . 'show_' . $agent->slug);
        }
    }

    /**
     * Handle the Agent "restored" event.
     */
    public function restored(Agent $agent): void
    {
        //
    }

    /**
     * Handle the Agent "force deleted" event.
     */
    public function forceDeleted(Agent $agent): void
    {
        //
    }
}
