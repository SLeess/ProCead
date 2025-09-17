<?php

namespace App\Models;

use App\Traits\LogsModelActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Activitylog\LogOptions;
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

    protected $casts = [
        'publico_alvo' => \App\Enums\Editais\EditalPublicoAlvo::class,
        'formato_notas' => \App\Enums\Editais\EditalFormatoNotas::class,
        'tipo_inscricao' => \App\Enums\Editais\EditalTipoInscricao::class,
        'categorias' => \App\Enums\Editais\EditalCategorias::class,
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'remanejamento' => 'boolean', // Boa prática para colunas TINYINT(1)
    ];

    public function datas(): HasOne
    {
        return $this->hasOne(Datas::class);
    }

    public function momentosRecurso(): HasMany
    {
        return $this->hasMany(MomentoRecurso::class);
    }

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
