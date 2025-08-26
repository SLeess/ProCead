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
        // para evitar os problemas com tipo de atributo (curso, disciplina, cargo), a vaga será uma tabela polimórfica
        // que pode ser associada a diferentes modelos.
        // deste modo, uma vaga pode ser um qualquer tipo de model, o que torna o sistema mais escalável.
        Schema::create('vagas', function (Blueprint $table) {
            $table->id();
            $table->morphs('vagable'); // cria 'vagable_id' (model_id) e 'vagable_type' (model_type)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vagas');
    }
};
