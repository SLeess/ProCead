<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Datas extends Model
{
    use HasFactory;
    protected $table = 'datas';

    protected $fillable = [
        'edital_id',
        'start_inscricao',
        'end_inscricao',
        'start_alteracao_dados',
        'end_alteracao_dados',
        'resultado_preliminar',
        'resultado_final',
        'start_avaliacao_socioeconomico',
        'end_avaliacao_socioeconomico',
        'start_avaliacao_pcd',
        'end_avaliacao_pcd',
        'start_avaliacao_hid',
        'end_avaliacao_hid',
        'start_avaliacao_etnica',
        'end_avaliacao_etnica',
        'start_avaliacao_genero',
        'end_avaliacao_genero',
    ];

    protected $casts = [
        'start_inscricao' => 'datetime',
        'end_inscricao' => 'datetime',
        'start_alteracao_dados' => 'datetime',
        'end_alteracao_dados' => 'datetime',
        'resultado_preliminar' => 'datetime',
        'resultado_final' => 'datetime',
        'start_avaliacao_socioeconomico' => 'datetime',
        'end_avaliacao_socioeconomico' => 'datetime',
        'start_avaliacao_pcd' => 'datetime',
        'end_avaliacao_pcd' => 'datetime',
        'start_avaliacao_hid' => 'datetime',
        'end_avaliacao_hid' => 'datetime',
        'start_avaliacao_etnica' => 'datetime',
        'end_avaliacao_etnica' => 'datetime',
        'start_avaliacao_genero' => 'datetime',
        'end_avaliacao_genero' => 'datetime',
    ];

    public function edital(): BelongsTo
    {
        return $this->belongsTo(Edital::class);
    }
}
