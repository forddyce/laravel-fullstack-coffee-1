<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Agent extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'latitude',
        'longitude',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'is_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($agent) {
            if (Auth::check()) {
                $agent->created_by = Auth::user()->email;
            }
        });

        static::updating(function ($agent) {
            if (Auth::check()) {
                $agent->updated_by = Auth::user()->email;
            }
        });
    }
}
