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
        Schema::create('anexos_modalidade', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anexo_id')->constrained('anexos')->onDelete('cascade');
            $table->foreignId('modalidade_id')->constrained('modalidades')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anexos_modalidade');
    }
};
