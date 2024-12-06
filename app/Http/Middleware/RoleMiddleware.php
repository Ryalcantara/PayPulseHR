<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle($request, Closure $next, $role)
    {
        $roles = is_array($role) ? $role : explode('|', $role);

        if (!$request->user() || !$request->user()->hasAnyRole($roles)) {
            abort(403, 'User does not have the right roles.');
            // Or redirect:
            return redirect()->route('/')->with('error', 'Unauthorized access');
        }

        return $next($request);
    }
}