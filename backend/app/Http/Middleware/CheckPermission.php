<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;
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
        try {
            $permission = Permission::where('name', $permission)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            return response()->json( [
                'success' => false,
                'message' => "Permissão não encontrada no sistema.",
                'data' => [],
            ], Response::HTTP_FORBIDDEN);
        }
        if (! $request->user()->hasPermissionTo($permission->name, $permission->guard_name) && !$request->user()->hasRole('super-Admin')) {
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
