<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // return auth()->user() && auth()->user()->can('gerenciar-papeis');
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
            "id" => [
                'required',
                'integer',
                'exists:roles,id'
            ],
            "name" => [
                'required',
                'string',
                'max:255',
            ],
            "scope" => [
                'required',
                'in:local,global'
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'id' => 'ID do Cargo',
            'name' => 'Nome do Cargo',
            'scope' => 'Escopo do Cargo',
        ];
    }
}
