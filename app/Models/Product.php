<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Auth;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Product extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'title',
        'slug',
        'primary_image',
        'content',
        'summary',
        'specifications',
        'images',
        'is_active',
        'favorite',
        'price',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'specifications' => 'array',
        'images' => 'array',
        'is_active' => 'boolean',
        'price' => 'decimal:4',
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(ProductCategory::class, 'product_has_categories', 'product_id', 'category_id');
    }

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
}
