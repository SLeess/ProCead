<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnexoModalidade extends Model
{
    protected $table = 'anexos_modalidade';
    protected $fillable = [
        'anexo_id',
        'modalidade_id',
    ];

    protected $logAttributes = [
        'anexo_id',
        'modalidade_id',
    ];

    protected $submitEmptyLogs = false;
    protected $logOnlyDirty = true;

    public function modalidade(){
        return $this->belongsTo(Modalidade::class);
    }
    public function anexo(){
        return $this->belongsTo(Anexo::class);
    }
}
