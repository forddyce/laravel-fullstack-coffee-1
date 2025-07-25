<?php

namespace App\Observers;

use App\Models\BlogTag;
use Illuminate\Support\Facades\Cache;

class BlogTagObserver
{
    protected const CACHE_TAG = 'blog_tags';
    protected const CACHE_TAG_BLOGS = 'client_blogs';

    protected const CACHE_PREFIX_ADMIN = 'admin_blog_tags_';
    protected const CACHE_PREFIX_CLIENT_BLOGS = 'client_blogs_';

    protected function clearBlogTagCaches(BlogTag $blogTag = null): void
    {
        if (CACHE_TAGS_AVAILABLE) {
            Cache::tags(self::CACHE_TAG)->flush();
            Cache::tags(self::CACHE_TAG_BLOGS)->flush();
        } else {
            if ($blogTag) {
                Cache::forget(self::CACHE_PREFIX_ADMIN . 'show_' . $blogTag->id);
            }
            Cache::flush();
        }
    }

    /**
     * Handle the BlogTag "created" event.
     */
    public function created(BlogTag $blogTag): void
    {
        $this->clearBlogTagCaches();
    }

    /**
     * Handle the BlogTag "updated" event.
     */
    public function updated(BlogTag $blogTag): void
    {
        $this->clearBlogTagCaches($blogTag);
    }

    /**
     * Handle the BlogTag "deleted" event.
     */
    public function deleted(BlogTag $blogTag): void
    {
        $this->clearBlogTagCaches($blogTag);
    }

    /**
     * Handle the BlogTag "restored" event.
     */
    public function restored(BlogTag $blogTag): void
    {
        //
    }

    /**
     * Handle the BlogTag "force deleted" event.
     */
    public function forceDeleted(BlogTag $blogTag): void
    {
        //
    }
}
