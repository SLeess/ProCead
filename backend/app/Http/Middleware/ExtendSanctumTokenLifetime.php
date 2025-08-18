<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ExtendSanctumTokenLifetime
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (auth('sanctum')->check()) {

            /** @var \Laravel\Sanctum\PersonalAccessToken $token */
            $token = auth('sanctum')->user()->currentAccessToken();

            $expirationMinutes = config('sanctum.expiration');

            if ($expirationMinutes) {

                $newExpirationTime = now()->addMinutes((int) $expirationMinutes);

                $token->update(['expires_at' => $newExpirationTime]);

                // IMPORTANTE: Envia a nova data de expiração de volta para o frontend
                // através de um header na resposta.
                $response->headers->set('X-Session-Expires-At', $newExpirationTime->toIso8601String());
            }
        }

        return $response;
    }
}
