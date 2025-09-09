<?php

namespace App\Http\Resources\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return[
            'id'           => $this->id,
            'log_name'     => $this->log_name,
            'description'  => $this->description,
            'event'        => $this->event,
            'subject_type' => $this->subject_type,
            'subject'      => $this->getSubjectResource($this->whenLoaded('subject')),
            'causer'       => new UserResource($this->whenLoaded('causer')),
            'properties'   => $this->properties,
            'created_at'   => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }

    /**
     * Função auxiliar para determinar qual Resource usar para o 'subject'.
     *
     * @param mixed $subject O modelo carregado da relação.
     * @return \Illuminate\Http\Resources\Json\JsonResource|null
     */
    protected function getSubjectResource($subject)
    {
        if (is_null($subject)) {
            return null;
        }

        $resourceMap = [
            User::class                 => UserResource::class,
            \App\Models\Edital::class   => EditalResource::class,
            \App\Models\Role::class     => RoleResource::class,
        ];

        $subjectClass = get_class($subject);

        if (isset($resourceMap[$subjectClass])) {
            $resourceClass = $resourceMap[$subjectClass];
            return new $resourceClass($subject);
        }

        return $subject->toArray();
    }
}
