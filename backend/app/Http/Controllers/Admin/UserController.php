<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends APIController
{
    public function index()
    {
        $users = User::paginate(15);
        return $this->sendResponse(UserCollection::make($users), 'Lista de usuários recuperada com sucesso');
    }

    // public function store(Request $request) { /* ... */ }
    // public function show(User $user) { return UserResource::make($user); }
    // public function update(Request $request, User $user) { /* ... */ }
    // public function destroy(User $user) { /* ... */ }
}
