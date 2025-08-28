<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PolosVaga extends Model
{
    protected $table = 'polos_vaga';
    protected $fillable = ['vaga_id', 'polo_id'];
    protected $logAttributes = ['vaga_id', 'polo_id'];

    public function polo()
    {
        return $this->belongsTo(Polo::class);
    }
    
}
