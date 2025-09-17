<?php

namespace App\Http\Requests\SuperAdmin;

use Illuminate\Foundation\Http\FormRequest;

class ReadUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return  $this->user() &&  $this->user()->hasRole('super-Admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // dd($this);
        return [
            'per_page' => 'integer|min:1|max:999',
            // 'search'   => 'string|max:255|nullable',
            'query'      => 'array|nullable',        // Garante que 'query' seja um array, se enviado.
            'query.*'    => 'string|nullable',
            'sort_by'  => ['nullable', 'string', \Illuminate\Validation\Rule::in(['nome', 'email', 'cpf', 'created_at', 'level_access'])],
            'sort_dir' => 'in:asc,desc|nullable',
        ];
    }
}
