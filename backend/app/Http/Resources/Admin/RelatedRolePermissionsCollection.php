<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RelatedRolePermissionsCollection extends ResourceCollection
{
    public $collects = RelatedRolePermissionsResource::class;

    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "roles" => $this->collection,
            'meta' => [
                'total' => $this->collection->count(),
            ],
        ];
    }
}
