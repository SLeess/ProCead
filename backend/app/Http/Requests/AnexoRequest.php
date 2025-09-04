<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnexoRequest extends FormRequest
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
            'nome' => 'required|string|max:255',
            'formato' => 'required|string|max:255',
            'caminho' => 'nullable|text',
            'editalId' => 'nullable|integer|exists:editais,id',
            'modalidadeId' => 'nullable|integer|exists:modalidades,id',
            'vagaId' => 'nullable|integer|exists:cursos,id',
        ];
    }
}
