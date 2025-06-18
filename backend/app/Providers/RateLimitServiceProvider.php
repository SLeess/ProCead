<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class RateLimitServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //Esse trecho de código define uma regra de "Rate Limiting" (Limitação de Taxa de Requisições) chamada api, que permite a um "usuário" fazer no máximo 60 requisições por minuto. Se o usuário estiver logado, ele é identificado pelo seu ID; se não estiver, ele é identificado pelo seu endereço de IP.

        RateLimiter::for('global', fn(Request $request) => Limit::perMinute(60)->by($request->user()?->id ?: $request->ip()));
        RateLimiter::for('auth', fn(Request $request) => Limit::perMinute(30)->by($request->user()?->id ?: $request->ip()));
    }
}
