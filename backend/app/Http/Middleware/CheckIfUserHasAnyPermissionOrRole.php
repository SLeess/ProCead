<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckIfUserHasAnyPermissionOrRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (! Auth::check()) {
            return response()->json( [
                'success' => false,
                'message' => "Usuário não autenticado",
                'data' => [],
            ], Response::HTTP_FORBIDDEN);
        }

        if ($request->user()->dontHaveAnyPermissionOrRole()) {
            return response()->json( [
                'success' => false,
                'message' => "Você não tem permissão para acessar a área administrativa.",
                'data' => [],
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
