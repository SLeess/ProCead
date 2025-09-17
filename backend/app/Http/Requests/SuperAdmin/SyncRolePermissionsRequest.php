<?php

namespace App\Http\Requests\SuperAdmin;

use Illuminate\Foundation\Http\FormRequest;

class SyncRolePermissionsRequest extends FormRequest
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
            'role_id' => [
                'required',
                'integer',
                'exists:roles,id',
            ],
            // 'role_data' => [
            //     'present',
            //     'array',
            // ],
            // 'role_data.*' => [
            //     'required',
            // ],
            'permissions' => [
                'present',
                'array',
            ],

            'permissions.*' => [
                'required',
                'integer',
                'exists:permissions,id',
            ]
        ];
    }
}
