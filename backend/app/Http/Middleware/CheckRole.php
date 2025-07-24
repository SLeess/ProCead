<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @param  string  $role
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        if (! Auth::check()) {
            // abort(403, 'Autenticação não realizada.');
            return response()->json( [
                'success' => false,
                'message' => "Usuário não autenticado",
                'data' => [],
            ], Response::HTTP_FORBIDDEN);
        }

        if (! $request->user()->hasRole($role)) {
            // abort(403, 'Acesso negado por falta de cargo.');
            return response()->json( [
                'success' => false,
                'message' => "Usuário não apresenta o cargo necessário para seguir com a aplicação",
                'data' => [],
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
