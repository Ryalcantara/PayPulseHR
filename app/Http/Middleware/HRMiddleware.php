<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HRMiddleware
{
    public function handle($request, Closure $next)
    {
        $employee = $request->user()->employee;

        if (!$employee || $employee->role !== 'HR') {
            abort(403, 'Only HR personnel can access this resource.');
        }

        return $next($request);
    }
}