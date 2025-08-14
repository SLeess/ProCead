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
        Schema::create('cotistas', function (Blueprint $table) {
            $table->id();
            $table->enum('status', [
                'EM_ANALISE',
                'DEFERIDO_COM_RESSALVAS',
                'DEFERIDO',
                'INDEFERIDO'])
            ->default('EM_ANALISE');
            $table->longText('motivo');

            $table->timestamps();
            $table->foreignId('inscricao_id')->references('id')->on('inscricoes');
            // coloca edital_id ?
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cotistas');
    }
};
