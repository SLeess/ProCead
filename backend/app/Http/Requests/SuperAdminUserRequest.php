<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SuperAdminUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() && auth()->user()->hasRole('super-Admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'per_page' => 'integer|min:1|max:999',
            'search'   => 'string|max:255|nullable',
            'sort_by'  => ['nullable', 'string', \Illuminate\Validation\Rule::in(['nome', 'email', 'cpf', 'created_at', 'level_access'])],
            'sort_dir' => 'in:asc,desc|nullable',
        ];
    }

    public function attributes(): array
    {
        return [
            'per_page' => 'de itens por página',
            'search' => 'de busca geral',
            'sort_by' => 'Ordenador',
            'sort_dir' => 'Direção de ordenação',
        ];
    }
}
