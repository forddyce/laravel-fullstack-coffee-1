<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class BlogTag extends Model
{
    use HasFactory, HasSlug;

    protected $table = 'blog_tags';

    protected $fillable = [
        'title',
        'slug',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
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

    public function blogs()
    {
        return $this->belongsToMany(Blog::class, 'blog_has_tags', 'tag_id', 'blog_id');
    }
}
