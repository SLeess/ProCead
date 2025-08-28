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
        Schema::create('vagas_inscricao', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inscricao_id')->constrained('inscricoes')->onDelete('cascade');
            $table->foreignId('quadro_vaga_id')->constrained('quadro_vagas')->onDelete('cascade');
            $table->foreignId('modalidade_id')->constrained('modalidades')->onDelete('cascade');
            $table->foreignId('categoria_vaga_id')->constrained('categorias_vaga')->onDelete('cascade')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vagas_inscricao');
    }
};
