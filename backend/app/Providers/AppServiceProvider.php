<?php

namespace App\Providers;

use App\Models\PersonalAccessToken;
use Carbon\Carbon;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

use App\Models\Edital;
use App\Policies\EditalPolicy;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(Edital::class, EditalPolicy::class);

        Carbon::setlocale(LC_TIME);

        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
