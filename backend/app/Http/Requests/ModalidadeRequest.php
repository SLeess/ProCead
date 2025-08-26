<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ModalidadeRequest extends FormRequest
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
            'sigla' => 'required|string|max:10',
            'descricao' => 'required|string|max:255',
            'editalId' => 'required|integer|exists:editais,id',
            'tipos_avaliacao' => 'sometimes|array',
            'tipos_avaliacao.*' => 'string|exists:tipos_avaliacao,tipo'
        ];
    }
}
