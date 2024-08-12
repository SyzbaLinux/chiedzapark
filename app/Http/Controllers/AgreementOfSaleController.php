<?php

namespace App\Http\Controllers;

use App\Models\AgreementOfSale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgreementOfSaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

         return Inertia::render('Contracts',[
             'contracts' => AgreementOfSale::where('is_cancelled',0)->with(['client','project','stand'])->get()
         ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AgreementOfSale $agreementOfSale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AgreementOfSale $agreementOfSale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AgreementOfSale $agreementOfSale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AgreementOfSale $agreementOfSale)
    {
        //
    }
}
