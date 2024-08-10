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
        Schema::create('agreement_of_sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id');
            $table->foreignId('client_id');
            $table->foreignId('stand_id');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->date('date_signed')->nullable();
            $table->decimal('agreement_fee', 60, 2)->nullable();

            $table->decimal('price', 60, 2)->nullable();
            $table->decimal('electrification_costs', 60, 2)->nullable();
            $table->decimal('deposit', 60, 2)->nullable();
            $table->decimal('monthly_payment', 60, 2);
            $table->integer('number_of_installments')->nullable();

            $table->decimal('intrest_amount',50,2)->nullable();
            $table->string('document')->nullable();
            $table->boolean('is_active')->default(1);
            $table->boolean('has_vat')->default(0);
            $table->boolean('has_endowments')->default(0);
            $table->boolean('is_cancelled')->default(false);
            $table->string('batch')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agreement_of_sales');
    }
};
