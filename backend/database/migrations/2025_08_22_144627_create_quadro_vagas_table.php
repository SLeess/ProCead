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
        Schema::create('quadro_vagas', function (Blueprint $table) {
            $table->id();
            $table->integer('codigo')->unique();
            $table->enum('semestre', ['1', '2']);
            $table->foreignId('edital_id')->constrained('editais')->onDelete('cascade');
            $table->foreignId('vaga_id')->constrained()->onDelete('cascade');
            $table->string('habilitacao');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quadro_vagas');
    }
};
