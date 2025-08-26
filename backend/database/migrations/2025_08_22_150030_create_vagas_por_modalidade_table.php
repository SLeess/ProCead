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
        Schema::create('vagas_por_modalidade', function (Blueprint $table) {
            $table->id();
            $table->foreignId('modalidade_id')->constrained('modalidades')->onDelete('cascade');
            $table->foreignId('quadro_vaga_id')->constrained('quadro_vagas')->onDelete('cascade');
            $table->integer('quantidade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vagas_por_modalidade');
    }
};
