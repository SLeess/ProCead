<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $permission)
    {
        if (! Auth::check()) {
            // abort(403, 'Autenticação não realizada.');
            return response()->json( [
                'success' => false,
                'message' => "Usuário não autenticado",
                'data' => [],
            ], Response::HTTP_FORBIDDEN);
        }

        if (! $request->user()->hasPermissionTo($permission)) {
            // abort(403, 'Acesso negado por falta de permissão.');

            return response()->json( [
                'success' => false,
                'message' => "Acesso negado por falta de permissão",
                'data' => [],
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
