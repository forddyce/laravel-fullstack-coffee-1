<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Index', [
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ])->rootView('front');
    }
}
