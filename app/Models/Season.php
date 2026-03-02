<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Season extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'title',
        'slug',
        'sort_order',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function auctionItems(): HasMany
    {
        return $this->hasMany(AuctionItem::class);
    }

    protected static function booted(): void
    {
        static::creating(function ($season) {
            if (Auth::check()) {
                $season->created_by = Auth::user()->email;
            }
        });

        static::updating(function ($season) {
            if (Auth::check()) {
                $season->updated_by = Auth::user()->email;
            }
        });
    }
}
