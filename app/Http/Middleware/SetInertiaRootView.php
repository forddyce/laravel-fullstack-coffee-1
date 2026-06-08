<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SetInertiaRootView
{
    public function handle(Request $request, Closure $next, string $rootView = 'app'): Response
    {
        Inertia::setRootView($rootView);

        return $next($request);
    }
}
