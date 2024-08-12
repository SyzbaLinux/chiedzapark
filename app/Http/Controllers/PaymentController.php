<?php

namespace App\Http\Controllers;

use App\Models\AgreementOfSale;
use App\Models\Client;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        return Inertia::render('Payments', [
            'payments' => Payment::orderBy('receipt_date','DESC')->with('client')->get(),
            'clients'  => Client::orderBy('first_name','DESC')->get(),
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'client_id'            =>'required',
            'receipt_date'         =>'required | date',
            'agreement_of_sale_id' =>'required',
            'amount_paid'          =>'required |decimal:2',
        ]);

        if($request->id){
            $payment = Payment::find($request->id);
        }
        else{
            $payment = new Payment();
        }

        $agreement = AgreementOfSale::find($request->agreement_of_sale_id);
        $stand     = AgreementOfSale::find($request->stand_id);

        $payment->project_id            = $agreement->project_id;
        $payment->client_id             = $request->client_id;
        $payment->receipt_date          = $request->receipt_date;
        $payment->agreement_of_sale_id  = $request->agreement_of_sale_id;
        $payment->stand_number          = $stand->stand_number;
        $payment->receipt_number        = $request->receipt_number;
        $payment->amount_paid           = $request->amount_paid;
        $payment->description           = $request->description;
        $payment->amount_in_words       = $this->numberToWord($request->amount_paid);


        return back()->with('message', [
            'type'        => 'success',
            'description' => '',
            'title'        => 'Payment Details Saved',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();

        return back()->with('message', [
            'type'        => 'success',
            'description' => '',
            'title'        => 'Payment Deleted',
        ]);
    }
}
