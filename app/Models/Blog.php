<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Blog extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'summary',
        'featured_image',
        'is_active',
        'published_date',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'published_date' => 'datetime',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function setPublishedDateAttribute($value)
    {
        $this->attributes['published_date'] = $value ?? now();
    }

    public function tags()
    {
        return $this->belongsToMany(BlogTag::class, 'blog_has_tags', 'blog_id', 'tag_id');
    }

    protected static function booted()
    {
        static::creating(function ($blogTag) {
            if (Auth::check()) {
                $blogTag->created_by = Auth::user()->email;
            }
        });

        static::updating(function ($blogTag) {
            if (Auth::check()) {
                $blogTag->updated_by = Auth::user()->email;
            }
        });
    }
}
