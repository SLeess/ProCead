<?php

namespace App\Http\Requests\Candidato;

use Illuminate\Foundation\Http\FormRequest;

class StoreInscricaoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules =  [
            // informações básicas
            'nome_completo' => 'required|string|max:255',
            'cpf' => 'required|string|size:14', // formato xxxxxxxxxxx
            'email' => 'required|email|max:255',
            'data_nascimento' => 'required',
            'telefone' => 'required|string|size:15',
            'genero' => 'required|string',
            'nome_social' => 'nullable|string|max:255',
            'identidade_genero' => 'nullable|string',
            'rg' => 'required|string|max:50',
            'estado_civil' => 'required|string',
            'uf_nascimento' => 'required|string|size:2',
            'nacionalidade' => 'required|string',
            'naturalidade' => 'required|string',

            // endereço
            'cep' => 'required|string|size:9',
            'rua' => 'required|string|max:255',
            'bairro' => 'required|string|max:255',
            'cidade' => 'required|string|max:255',
            'uf' => 'required|string|size:2',
            'numero' => 'max:255',
            'complemento' => 'nullable|string|max:255',

            // etc
            'termo_responsabilidade' => 'required|accepted|boolean',
            'editalId' => 'required|integer|exists:editais,id',
            'status' => 'nullable|string',
            'motivo' => 'nullable|string',
            'user_uuid' => 'required|string',

            //vaga
            'vagas' => 'required|array',
            'vagas.*.vaga' => 'required|exists:quadro_vagas,id',
            'vagas.*.polo' => 'required|exists:polos,id',
            'vagas.*.modalidade' => 'required|exists:modalidades,id',
            'vagas.*.categoria' => 'nullable|exists:categorias_vaga,id',

            //anexos
            'vagas.*.anexo_cpf' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'vagas.*.anexo_historico' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'vagas.*.anexo_comprovante_residencia' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'vagas.*.anexo_autodeclaracao' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ];
        return $rules;
    }
}
