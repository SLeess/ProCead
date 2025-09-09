<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InscricaoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'n_inscricao' => $this->n_inscricao,
            'nome_completo' => $this->nome_completo,
            'cpf' => $this->cpf,
            'email' => $this->email,
            'data_nascimento' => $this->data_nascimento,
            'telefone' => $this->telefone,
            'genero' => $this->genero,
            'nome_social' => $this->nome_social,
            'identidade_genero' => $this->identidade_genero,
            'identidade' => $this->identidade,
            'estado_civil' => $this->estado_civil,
            'uf_naturalidade' => $this->uf_naturalidade,
            'naturalidade' => $this->naturalidade,
            'nacionalidade' => $this->nacionalidade,
            'cep' => $this->cep,
            'rua' => $this->rua,
            'bairro' => $this->bairro,
            'cidade' => $this->cidade,
            'uf' => $this->uf,
            'numero' => $this->numero,
            'complemento' => $this->complemento,
            'termo_responsabilidade' => $this->termo_responsabilidade,
            'edital_id' => $this->edital_id,
            'status' => $this->status,
            'motivo' => $this->motivo,
            'user_uuid' => $this->user_uuid,
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null,
            'vagas' => $this->vagas_inscricao->map(function($vaga) {
                return [
                    'id' => $vaga->id,
                    'quadro_vaga_id' => $vaga->quadro_vaga_id,
                    'nome' => $vaga->vaga->vaga->vagable->nome ?? null,
                    'polo' => $vaga->polo->nome ?? null,
                    'modalidade' => $vaga->modalidade->descricao ?? null,
                    'categoria' => $vaga->categoria->nome ?? null,
                ];
            }),
            // 'modalidade' => $this->modalidade,
            // 'categoria' => $this->categoria,
            // 'polo' => $this->polo,
        ];
    }
}
