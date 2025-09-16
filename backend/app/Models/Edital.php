<?php

namespace App\Models;

use App\Traits\LogsModelActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;

class Edital extends Model
{
    use HasFactory,
    LogsActivity, LogsModelActivity;
    protected $table = 'editais';

    protected $fillable =[
        'referencia',
        'descricao',
        'publico_alvo',
        'formato_notas',
        'tipo_inscricao',
        'max_itens_inscricao',
        'max_itens_posse',
        'remanejamento',
        'categorias',
        'tipo_avaliacao_reserva_vagas'
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('Edital')
            ->setDescriptionForEvent(fn(string $eventName) => "O edital '{$this->referencia}' foi {$this->formatEventName($eventName)}");
    }

    private function formatEventName(string $eventName): string
    {
        return match ($eventName) {
            'created' => 'cadastrado',
            'updated' => 'atualizado',
            'deleted' => 'deletado',
            default => $eventName,
        };
    }
}
