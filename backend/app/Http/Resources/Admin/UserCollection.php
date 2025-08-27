<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{

    public $collects = UserResource::class;


    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'users' => $this->collection,
            'meta' => [
                'total' => $this->total(),
                'per_page' => $this->perPage(),
                'current_page' => $this->currentPage(),
                'last_page' => $this->lastPage(),
            ],
            'links' => [
                'next_page_url' => $this->nextPageUrl(),
            ],
        ];
    }
}
