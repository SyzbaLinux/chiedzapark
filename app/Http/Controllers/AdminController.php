<?php

namespace App\Http\Controllers;

use App\Models\AgreementOfSale;
use App\Models\Client;
use App\Models\Payment;
use App\Models\Stand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
     public function index()
     {
         return Inertia::render('Dashboard', [
             'stands'        => Stand::count(),
             'clients'       => Client::count(),
             'active'        => AgreementOfSale::where('is_cancelled',0)->count(),
             'cancelled'     => AgreementOfSale::where('is_cancelled',1)->count(),
             'totalpayments' => Payment::where('receipt_date','>=',date('Y-m-01'))->sum('amount_paid'),
         ]);
     }

    public function clientContracts($client)
    {
            return AgreementOfSale::where('client_id')->get();
     }
}
