<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Requests\SuperAdminLogsRequest;
use App\Http\Resources\Admin\LogCollection;
use App\Interfaces\SuperAdmin\ISuperAdminUserManagerService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Nette\NotImplementedException;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Symfony\Component\HttpFoundation\Response;

class LogController extends __SuperAdminController
{
    public function __construct(protected ISuperAdminUserManagerService $iSuperAdminUserManagerService){
        $this->middleware('role:super-Admin');
    }
    public function index(SuperAdminLogsRequest $request)
    {
        $validated = $request->validated();

        $perPage = $validated['per_page'] ?? 4;
        $query = Activity::with(['causer', 'subject'])->search($request);

        if (isset($validated['sort_by'])) {
            $sortBy = $validated['sort_by'];
            $sortDir = $validated['sort_dir'] ?? 'asc';

            if (Schema::hasColumn('activity_log', $sortBy)) {
                $query->orderBy($sortBy, $sortDir);
            }

        } else {
            $query->orderBy('created_at', 'desc');
        }

        // $paginatedLogs = $query->paginate($perPage);
        $currentPage = LengthAwarePaginator::resolveCurrentPage();

        $logs = $query->get()->filter(fn($log) => $log->event !== 'Login');

        $currentPageItems = collect($logs->slice(($currentPage - 1) * $perPage, $perPage)->values());

        $paginatedLogs = new LengthAwarePaginator(
            $currentPageItems,
            $logs->count(),
            $perPage,
            $currentPage,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        try {
            return $this->sendResponse(
                LogCollection::make($paginatedLogs),
                "Logs enviados com sucesso."
            );
        } catch (\Exception $e) {
            Log::error('Erro ao buscar logs: ' . $e->getMessage());
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function userIndex(SuperAdminLogsRequest $request, User $user)
    {
        $validated = $request->validated();

        $perPage = $validated['per_page'] ?? 4;
        $query = Activity::with(['causer', 'subject'])->search($request);

        if (isset($validated['sort_by'])) {
            $sortBy = $validated['sort_by'];
            $sortDir = $validated['sort_dir'] ?? 'asc';

            if (Schema::hasColumn('activity_log', $sortBy)) {
                $query->orderBy($sortBy, $sortDir);
            }

        } else {
            $query->orderBy('created_at', 'desc');
        }

        // $paginatedLogs = $query->paginate($perPage);
        $currentPage = LengthAwarePaginator::resolveCurrentPage();

        $logs = $query->where('subject_id', $user->uuid)
                      ->orWhere('causer_id', $user->uuid)
                      ->get()
                      ->filter(fn($log) => $log->event !== 'Login');

        $currentPageItems = collect($logs->slice(($currentPage - 1) * $perPage, $perPage)->values());

        $paginatedLogs = new LengthAwarePaginator(
            $currentPageItems,
            $logs->count(),
            $perPage,
            $currentPage,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        try {
            return $this->sendResponse(
                LogCollection::make($paginatedLogs),
                "Logs enviados com sucesso."
            );
        } catch (\Exception $e) {
            Log::error('Erro ao buscar logs: ' . $e->getMessage());
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show()
    {
        throw new NotImplementedException("show LogController");
    }
}
