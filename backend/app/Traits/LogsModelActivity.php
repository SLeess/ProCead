<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

trait LogsModelActivity
{
    /**
     * Inicializa o trait e registra os observadores de eventos.
     */
    protected static function bootLogsModelActivity(): void
    {
        static::created(function ($model) {
            static::logActivity('Criação', $model);
        });

        static::updated(function ($model) {
            static::logActivity('Atualização', $model);
        });

        static::deleted(function ($model) {
            static::logActivity('Deleção', $model);
        });
    }

    /**
     * Função central que formata e escreve a mensagem de log.
     *
     * @param string $eventName
     * @param \Illuminate\Database\Eloquent\Model $model
     */
    protected static function logActivity(string $eventName, $model): void
    {
        $userName = Auth::user()->nome ?? 'Sistema'; // Pega o nome do usuário logado ou 'Sistema' (para seeders/comandos)
        $modelName = class_basename($model); // Pega o nome do model (ex: 'User')

        $logMessage = "{$modelName} {$eventName} por {$userName}.";

        // Para atualizações, é útil saber o que mudou
        if ($eventName === 'Atualização') {
            $changes = collect($model->getDirty())->except(['updated_at'])->toJson();
            $logMessage .= " Alterações: {$changes}";
        }

        Log::info($logMessage);
    }
}
