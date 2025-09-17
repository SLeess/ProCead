<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInscricaoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules =  [
            // informações básicas
            'nome_completo' => 'required|string|max:255',
            'cpf' => 'required|string|size:11|exists:inscricoes,cpf',
            'email' => 'required|email|max:255',
            'data_nascimento' => 'required',
            'telefone' => 'required|string|size:11',
            'genero' => 'required|string',
            'nome_social' => 'nullable|string|max:255',
            'identidade_genero' => 'nullable|string',
            'identidade' => 'required|string|max:50',
            'estado_civil' => 'required|string',
            'uf_naturalidade' => 'required|string|size:2',
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
            'status' => 'nullable|string',
            'motivo' => 'nullable|string',
        ];
        return $rules;
    }
}
