<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MomentoRecurso extends Model
{
    use HasFactory;
    protected $table = 'momentos_recursos';

    protected $fillable = [
        'edital_id',
        'descricao',
        'data_inicio',
        'data_fim',
    ];

    protected $casts = [
        'data_inicio' => 'datetime',
        'data_fim' => 'datetime',
    ];

    public function edital(): BelongsTo
    {
        return $this->belongsTo(Edital::class);
    }
}
