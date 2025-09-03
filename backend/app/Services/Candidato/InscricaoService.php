<?php

namespace App\Services\Candidato;

use App\Models\Edital;
use App\Models\Inscricao;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Str;
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

    private function generateNumeroInscricao($editalId): string
    {
        $edital = Edital::find($editalId);
        $lastInscricao = Inscricao::where('edital_id', $editalId)->orderBy('created_at', 'desc')->first();
        if($lastInscricao){
            $numeroInscricao = $lastInscricao->n_inscricao + 1;
            return $numeroInscricao;
        }
        $numEdital = explode(' ',$edital->referencia)[0];
        $numeroInscricao = Str::substr(  $numEdital, -2, 2).$edital->id.Str::substr($numEdital, 1, 1).'00001';
        
        return $numeroInscricao;
    }
    public function createInscricao(array $data): Inscricao
    {
        DB::beginTransaction();

        try {
            $inscricaoData = $this->prepareDataForStorage($data);
            $inscricaoData['n_inscricao'] = $this->generateNumeroInscricao($inscricaoData['edital_id']);
            $inscricao = Inscricao::create($inscricaoData);

            foreach($data['vagas'] as $vaga){
                $inscricao->vagas_inscricao()->create([
                    'quadro_vaga_id' => $vaga['vaga'],
                    'polo_id' => $vaga['polo'],
                    'modalidade_id' => $vaga['modalidade'],
                    'categoria_vaga_id' => $vaga['categoria'] ?? null,
                ]);
            }

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
            'user_uuid' => $data['user_uuid'],
            'edital_id' => $data['editalId'],

            //vaga
            'vagas' => $data['vagas'],
        ];
    }
}