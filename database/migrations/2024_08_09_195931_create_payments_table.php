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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id');
            $table->foreignId('client_id');
            $table->date('receipt_date');
            $table->foreignId('agreement_of_sale_id')->nullable();
            $table->foreignId('stand_number')->nullable();
            $table->string('receipt_number')->nullable();
            $table->decimal('amount_paid',30,2);
            $table->string('description')->nullable();
            $table->string('payment_method')->default('cash');
            $table->string('currency')->default('usd');
            $table->mediumText('amount_in_words')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
