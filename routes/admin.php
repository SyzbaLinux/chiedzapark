<?php
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group([
    'as'=>'admin.',
    'middleware'=>[
        'auth:sanctum',
        config('jetstream.auth_session'),
        'verified',
    ],
],function () {
//
    Route::get('/dashboard', [AdminController::class,'index'])->name('dashboard');
    Route::resource('/stands', \App\Http\Controllers\StandController::class);

    Route::resource('/projects', \App\Http\Controllers\ProjectController::class);
    Route::resource('/batch', \App\Http\Controllers\BatchController::class);
    Route::resource('/batch-rules', \App\Http\Controllers\BatchRuleController::class);

    Route::resource('/clients', \App\Http\Controllers\ClientController::class);
    Route::resource('/contracts', \App\Http\Controllers\AgreementOfSaleController::class);
    Route::get('/cancelled-contracts', [AdminController::class,'cancelledContracts'])->name('cancelled.contracts');
    Route::resource('/payments', \App\Http\Controllers\PaymentController::class);
    Route::get('/reports', [AdminController::class,'report'])->name('report');
    Route::get('/users', [AdminController::class,'users'])->name('users');
    Route::get('/client-contracts/{client}', [AdminController::class,'clientContracts'])->name('clientContracts');
});
