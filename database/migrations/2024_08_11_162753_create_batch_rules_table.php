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
        Schema::create('batch_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id');
            $table->foreignId('batch_id');
            $table->date('start_date');
            $table->date('end_date');
            $table->decimal('installment_amount',20,2);
            $table->boolean('calculate_penalty')->default(1);
            $table->integer('calculate_penalty_after')->default(10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batch_rules');
    }
};
