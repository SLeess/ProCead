<?php

// use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Middleware\SetLocale;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
         $middleware->web(append: [
            SetLocale::class,
        ]);

        $middleware->api(append: [
            SetLocale::class,
        ]);
        $middleware->alias([
            'role' => \App\Http\Middleware\CheckRole::class,
            'permission' => \App\Http\Middleware\CheckPermission::class,
            'admin-access' => \App\Http\Middleware\CheckIfUserHasAnyPermissionOrRole::class,
            'abilities' => \Laravel\Sanctum\Http\Middleware\CheckAbilities::class,
            'ability' => \Laravel\Sanctum\Http\Middleware\CheckForAnyAbility::class,
            'extends-sanctum-token-life' => \App\Http\Middleware\ExtendSanctumTokenLifetime::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (ThrottleRequestsException $e, $request) {
            if ($request->is('api/*') || $request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Excesso de requisições enviadas! Tente novamente em '. $e->getHeaders()['Retry-After'].' segundos.',
                ], $e->getStatusCode());
            }
        });
        $exceptions->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->is('api/*') || $request->wantsJson()) {
                $previous = $e->getPrevious();

                $errorMessage = "";

                if ($previous instanceof ModelNotFoundException) {
                    $modelFullName = $previous->getModel();
                    $translationKey = 'messages.models.' . $modelFullName;
                    $translatedModel = trans($translationKey, []);

                    $errorMessage = trans('messages.model_not_found', ['model' => $translatedModel]);
                } else{
                    $errorMessage = trans('messages.model_not_found', ['model' => "Elemento"]);
                }

                return response()->json([
                    'message' => $errorMessage,
                    'success' => false,
                ], Response::HTTP_NOT_FOUND);
            }
        });

        // ===================================================================
        // 2. Manipulador Genérico para TODAS as outras exceções da API
        //    (Atua como um "catch-all" para o resto)
        // ===================================================================
        $exceptions->renderable(function (Throwable $e, Request $request) {
            if  ($request->is('api/*')) {
                // dd($e);
                if ($e instanceof HttpException) {
                    return response()->json([
                        'success' => false,
                        'message' => $e->getMessage() ?: 'Ocorreu um erro na sua requisição.',
                    ], $e->getStatusCode());
                }

                return response()->json([
                    'success' => false,
                    'message' => app()->isProduction() ? 'Ocorreu um erro interno no servidor.' : $e->getMessage(),
                ], 500);
            }
        });
    })->create();
