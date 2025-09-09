<?php

namespace App\Models;

use Illuminate\Support\Str;
use Spatie\Activitylog\Models\Activity as SpatieActivity;

class Activity extends SpatieActivity
{
    public function scopeSearch($query, $request)
    {
        // Lógica para a busca GLOBAL (campo "Pesquisar")
        $query->when($request->input('search'), function ($query, $searchTerm) {
            return $query->where(function ($subQuery) use ($searchTerm) {
                $subQuery->where('log_name', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('description', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('subject_type', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('event', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('subject_id', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('causer_type', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('causer_id', 'LIKE', "%{$searchTerm}%");

                if(Str::title($searchTerm) === 'Sistema')
                    $subQuery->orWhere('causer_id', null);
            });
        });

        // Lógica para os filtros ESPECÍFICOS (o array `query`)
        // $query->when($request->input('query'), function ($query, $filters) {
        //     $query->when($filters['nome'] ?? null, function ($query, $nome) {
        //         return $query->where('nome', 'LIKE', "%{$nome}%");
        //     });
        //     $query->when($filters['email'] ?? null, function ($query, $email) {
        //         return $query->where('email', 'LIKE', "%{$email}%");
        //     });
        //     $query->when($filters['cpf'] ?? null, function ($query, $cpf) {
        //         return $query->where('cpf', 'LIKE', "%{$cpf}%");
        //     });

        // });

        return $query;
    }
}
