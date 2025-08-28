<?php

namespace App\Services\Candidato;

use App\Models\Inscricao;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Throwable;

class InscricaoService
{
    /**
     * Creates a new Inscricao record.
     *
     * @param array $data The validated data from the request.
     * @return Inscricao The created Inscricao model instance.
     * @throws \Exception
     */
    public function createInscricao(array $data): Inscricao
    {
        DB::beginTransaction();

        try {
            $inscricaoData = $this->prepareDataForStorage($data);

            $inscricao = Inscricao::create($inscricaoData);

            DB::commit();

            return $inscricao;

        } catch (Throwable $e) {
            DB::rollBack();
            throw new \Exception('An error occurred while creating the inscription: ' . $e->getMessage());
        }
    }

    /**
     * Formats and cleans the raw data for database insertion.
     *
     * @param array $data
     * @return array
     */
    private function prepareDataForStorage(array $data): array
    {
        // dd($data);
        return [
            // informações básicas
            'nome_completo' => $data['nome_completo'],
            'cpf' => str_replace(['.', '-'], '', $data['cpf']),
            'email' => $data['email'],
            'data_nascimento' => Carbon::createFromFormat('d/m/Y', $data['data_nascimento'])->format('Y-m-d'),
            'telefone' => str_replace(['(', ')', ' ', '-'], '', $data['telefone']),
            'genero' => $data['genero'],
            'nome_social' => $data['nome_social'] ?? null,
            'identidade_genero' => $data['identidade_genero'] ?? null,
            'identidade' => $data['rg'],
            'estado_civil' => $data['estado_civil'],
            'uf_naturalidade' => $data['uf_nascimento'],
            'nacionalidade' => $data['nacionalidade'],
            'naturalidade' => $data['naturalidade'],

            // endereço
            'cep' => $data['cep'],
            'rua' => $data['rua'],
            'bairro' => $data['bairro'],
            'cidade' => $data['cidade'],
            'uf' => $data['uf'],
            'numero' => $data['numero'] ?? null,
            'complemento' => $data['complemento'] ?? null,

            // etc
            'termo_responsabilidade' => $data['termo_responsabilidade'],
            'contexto_id' => $data['editalId'],
            'status' => $data['status'] ?? 'Em análise', 
            'motivo' => $data['motivo'] ?? null,
            'user_uuid' => $data['user']['uuid'],
            'edital_id' => $data['editalId'],
        ];
    }
}