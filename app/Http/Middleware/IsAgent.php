<?php

namespace App\Http\Middleware;
use Closure;
use Auth;

class IsAgent
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!(Auth::user() && Auth::user()->isAgent()))
        {
            return response("Unauthorized Access", RESPONSE_UNAUTHORIZED);
        }
        return $next($request);
    }
}
