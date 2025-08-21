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
        Schema::create('modalidade_tipo_avaliacao', function (Blueprint $table) {
            $table->id();
            $table->foreignId('modalidade_id')->references('id')->on('modalidades');
            $table->foreignId('tipo_avaliacao_id')->references('id')->on('tipos_avaliacao');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modalidade_tipos_avaliacao');
    }
};
