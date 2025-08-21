<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = null;

        if (auth()->check() && auth()->user()->locale) {
            $locale = auth()->user()->locale; // Supondo que você tenha uma coluna 'locale' na sua tabela de usuários
        }

        if (!$locale && Session::has('locale')) {
            $locale = Session::get('locale');
        }

        if (!$locale) {
            $locale = $request->getPreferredLanguage(['pt_BR', 'en', 'es']);
        }

        if ($locale) {
            App::setLocale($locale);
        }

        return $next($request);
    }
}
