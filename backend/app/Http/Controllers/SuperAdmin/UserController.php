<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Resources\Admin\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Nette\NotImplementedException;
use Symfony\Component\HttpFoundation\Response;

class UserController extends __SuperAdminController
{
    public function index(Request $request)
    {
        $perPage = $request->validate(['per_page' => 'integer|min:1|max:9999'])['per_page'] ?? 15;

        $users = User::search($request)
                 ->paginate($perPage);
        try {
            return $this->sendResponse(
                UserCollection::make($users),
                "Usuários enviados com sucesso."
            );
        } catch (\Exception $e) {
            Log::error('Erro ao buscar usuários: ' . $e->getMessage());
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update()
    {
        throw new NotImplementedException("update UserController");
    }
    public function delete()
    {
        throw new NotImplementedException("delete UserController");
    }
    public function destroy()
    {
        throw new NotImplementedException("destroy UserController");
    }
}
