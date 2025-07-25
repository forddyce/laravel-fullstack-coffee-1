<?php

namespace App\Observers;

use App\Models\Blog;
use Illuminate\Support\Facades\Cache;

class BlogObserver
{
    protected const CACHE_TAG = 'blogs';
    protected const CACHE_PREFIX_ADMIN = 'admin_blogs_';
    protected const CACHE_PREFIX_CLIENT = 'client_blogs_';

    protected function clearBlogCaches(Blog $blog = null): void
    {
        if (CACHE_TAGS_AVAILABLE) {
            Cache::tags(self::CACHE_TAG)->flush();
        } else {
            if ($blog) {
                Cache::forget(self::CACHE_PREFIX_ADMIN . 'show_' . $blog->id);
                Cache::forget(self::CACHE_PREFIX_CLIENT . 'show_' . $blog->slug);
            }
            Cache::forget(self::CACHE_PREFIX_CLIENT . 'latest');
            Cache::flush();
        }
    }

    /**
     * Handle the Blog "created" event.
     */
    public function created(Blog $blog): void
    {
        $this->clearBlogCaches();
    }

    /**
     * Handle the Blog "updated" event.
     */
    public function updated(Blog $blog): void
    {
        $this->clearBlogCaches($blog);
    }

    /**
     * Handle the Blog "deleted" event.
     */
    public function deleted(Blog $blog): void
    {
        $this->clearBlogCaches($blog);
    }

    /**
     * Handle the Blog "restored" event.
     */
    public function restored(Blog $blog): void
    {
        //
    }

    /**
     * Handle the Blog "force deleted" event.
     */
    public function forceDeleted(Blog $blog): void
    {
        //
    }
}
