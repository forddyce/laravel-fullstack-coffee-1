<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class AuctionItem extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'title',
        'slug',
        'info',
        'content',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'info' => 'array',
        'is_active' => 'boolean',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($item) {
            if (Auth::check()) {
                $item->created_by = Auth::user()->email;
            }
        });

        static::updating(function ($item) {
            if (Auth::check()) {
                $item->updated_by = Auth::user()->email;
            }
        });
    }
}
