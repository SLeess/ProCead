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
        Schema::create('categorias_vaga', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->integer('indice');
            $table->foreignId('quadro_vaga_id')->constrained('quadro_vagas')->onDelete('cascade');
            $table->unique(['indice', 'quadro_vaga_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categorias_vaga');
    }
};
