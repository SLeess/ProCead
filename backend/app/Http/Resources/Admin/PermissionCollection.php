<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PermissionCollection extends ResourceCollection
{
    public $collects = PermissionResource::class;


    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        // dd(
        //     $this->collection
        //         ->groupBy(fn($e) => substr($e->name, strlen(explode("-", $e->name)[0] )+ 1))
        //         ->map(
        //             fn($i) => $i->map(fn($s) => ["id" => $s->id, "name" => $s->name])
        //             )
        //         ->toArray()
        // );
        // dd(
        //     $this->collection
        //         ->groupBy(fn($e) => explode("-", $e->name)[0])
        //         ->map(
        //             fn($i) => $i->map(fn($s) => ["id" => $s->id, "name" => $s->name])
        //             )->toArray()
        // );
        return [
            "permissions" => $this->collection
                ->groupBy(fn($e) => substr($e->name, strlen(explode("-", $e->name)[0] )+ 1)),
            'meta' => [
                'total' => $this->collection->count(),
            ],
        ];
    }
}
