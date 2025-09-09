<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SuperAdminLogsRequest extends FormRequest
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
        return [
            'per_page' => 'integer|min:1|max:999',
            'query'      => 'array|nullable',
            'query.*'    => 'string|nullable',
            'sort_by'  => [
                'nullable',
                'string',
                \Illuminate\Validation\Rule::in(
                    // ['log_name', 'description', 'subject_type', 'event', 'subject_id', 'causer_type', 'causer_id', 'created_at']
                [
                    "log_name",
                    "descricao",
                    "model_afetada",
                    "event",
                    "uuid_afetado",
                    "model_causador",
                    "uuid_causador",
                    "created_at",
                ])
            ],
            'sort_dir' => 'in:asc,desc|nullable',
        ];
    }
}
