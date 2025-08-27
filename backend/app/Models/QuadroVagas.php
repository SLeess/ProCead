<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuadroVagas extends Model
{
    protected $table = 'quadro_vagas';
    protected $fillable = [
        'codigo',
        'semestre',
        'edital_id',
        'vaga_id',
        'polo_id',
        'habilitacao'
    ];

    public function vagasPorModalidade()
    {
        return $this->hasMany(VagasPorModalidade::class, 'quadro_vaga_id');
    }
    public function categoriasCustomizadas()
    {
        return $this->hasMany(CategoriasVaga::class, 'quadro_vaga_id');
    }
    public function vaga()
    {
        return $this->belongsTo(Vaga::class);
    }
    public function polos()
    {
        return $this->hasMany(PolosVaga::class);
    }
}
