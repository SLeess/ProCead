<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuadroVagaRequest extends FormRequest
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

        return [
            'codigo' => 'required|string|max:255|unique:quadro_vagas,codigo',
            'semestre' => 'required|string|max:1|in:1,2',
            'edital_id' => 'required|integer|exists:editais,id',
            'vaga' => 'required|integer|exists:vagas,id',
            'campus' => 'required|array|exists:polos,id',
            'campus.*' => 'exists:polos,id',
            'habilitacao' => 'nullable|string|max:255',
            'modalidades' => 'required|array|min:1',
            'categoriasCustomizadas' => 'nullable|array',
            'categoriasCustomizadas.*.nome' => 'required|string|max:255',
        ];
    }
}
