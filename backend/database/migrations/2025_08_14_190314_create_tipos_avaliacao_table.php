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
        Schema::create('tipos_avaliacao', function (Blueprint $table) {
            $table->id();
            $table->enum('tipo_avaliacao', [
            'GERAL',
            'HETEROIDENTIFICACAO',
            'ETNICA',
            'SOCIOECONOMICA'])
            ->default('GERAL');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipos_avaliacao');
    }
};
