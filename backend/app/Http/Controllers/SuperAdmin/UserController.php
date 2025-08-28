<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Requests\SuperAdminUserRequest;
use App\Http\Resources\Admin\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Nette\NotImplementedException;
use Symfony\Component\HttpFoundation\Response;

class UserController extends __SuperAdminController
{
    public function index(SuperAdminUserRequest $request)
    {
        $validated = $request->validated();

        $perPage = $validated['per_page'] ?? 15;
        $query = User::with('latestToken')->search($request);

        if (isset($validated['sort_by'])) {
            $sortBy = $validated['sort_by'];
            $sortDir = $validated['sort_dir'] ?? 'asc';

            if ($sortBy === 'level_access') {
                //Ordena pelo atributo virtual level_access do usuário, mas de forma mais performática
                $query->orderByRaw(
                    "CASE
                        WHEN EXISTS (SELECT 1 FROM model_has_roles mhr JOIN roles r ON mhr.role_id = r.id WHERE mhr.model_id = users.uuid AND r.name = 'super-Admin') THEN 1
                        WHEN EXISTS (SELECT 1 FROM model_has_roles WHERE model_id = users.uuid) THEN 2
                        WHEN EXISTS (SELECT 1 FROM model_has_permissions WHERE model_id = users.uuid) THEN 2
                        WHEN EXISTS (SELECT 1 FROM model_has_roles_by_edital WHERE user_id = users.uuid) THEN 2
                        WHEN EXISTS (SELECT 1 FROM model_has_permission_by_edital WHERE user_id = users.uuid) THEN 2
                        ELSE 3
                    END {$sortDir}"
                );

            } elseif (Schema::hasColumn('users', $sortBy)) {
                $query->orderBy($sortBy, $sortDir);
            }

        } else {
            $query->orderBy('created_at', 'desc');
        }

        $paginatedUsers = $query->paginate($perPage);

        try {
            return $this->sendResponse(
                UserCollection::make($paginatedUsers),
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
