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
        Schema::create('anexos_quadro_vaga', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anexo_id')->constrained('anexos');
            $table->foreignId('quadro_vaga_id')->constrained('quadro_vagas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anexos_quadro_vaga');
    }
};
