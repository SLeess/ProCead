<?php

namespace App\Http\Requests\SuperAdmin;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoleRequest extends FormRequest
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
            "name" => [
                'required',
                'string',
                'min:2',
                'max:255',
                'unique:roles,name'
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
