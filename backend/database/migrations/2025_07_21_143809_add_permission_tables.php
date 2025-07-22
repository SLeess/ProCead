<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('model_has_roles_by_edital', static function (Blueprint $table) {
            $table->unsignedBigInteger('role_id');

            $table->uuid('user_id');
            $table->index(['user_id'], 'user_has_roles_by_edital_index');

            $table->foreignIdFor(\App\Models\Edital::class);

            $table->foreign('edital_id')
                ->references('id')
                ->on('editais')
                ->onDelete('cascade');

            $table->foreign('role_id')
                ->references('id')
                ->on('roles')
                ->onDelete('cascade');

            $table->primary(['role_id', 'user_id', 'edital_id'],
                'user_has_role_by_edital_primary');

        });
        Schema::create('model_has_permission_by_edital', static function (Blueprint $table) {
            $table->unsignedBigInteger('permission_id');

            $table->uuid('user_id');
            $table->index(['user_id'], 'user_has_permissions_by_edital_index');

            $table->foreignIdFor(\App\Models\Edital::class);

            $table->foreign('edital_id')
                ->references('id')
                ->on('editais')
                ->onDelete('cascade');

            $table->foreign('permission_id')
                ->references('id')
                ->on('permissions')
                ->onDelete('cascade');

            $table->primary(['permission_id', 'user_id', 'edital_id'],
                'user_has_permissions_by_edital_primary');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('model_has_roles_by_edital');
        Schema::dropIfExists('model_has_permission_by_edital');
    }
};
