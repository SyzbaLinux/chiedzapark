<?php

namespace App\Observers;

use App\Models\AgreementOfSale;
use App\Models\Installment;
use App\Models\Payment;

class PaymentObserver
{
    /**
     * Handle the Payment "created" event.
     */
    public static  function created(Payment $payment): void
    {
        $contract     = AgreementOfSale::where('client_id', $payment->client_id)->first();
        $installments = Installment::where('agreement_of_sale_id', $contract->id)->orderBy('fulldate')->get();

        // Update the payment with the agreement of sale ID
        $payment->agreement_of_sale_id = $contract->id;
        $payment->save();

        // get the installment matching the month
        $month = date('m', strtotime($payment->receipt_date));
        $year  = date('Y', strtotime($payment->receipt_date));

        // Find the installment for the current month and year

        $cd = $installments->where('agreement_of_sale_id', $contract->id)
            ->where('month', $month)
            ->where('year', $year)
            ->first();

        // dd($currentInstallment);

        if($cd){

            if($cd->amount_received AND $cd->amount == $cd->amount_received){

                if($month == 12){
                    $currentInstallment = $installments->filter(function ($installment) use ($contract, $year, $cd) {
                        return $installment->agreement_of_sale_id == $contract->id &&
                            $installment->year > $year &&
                            ($installment->amount_received === null || $installment->amount_received < $cd->amount);
                    })->first();

                }

                else{

                    $currentInstallment = $installments->filter(function ($installment) use ($contract, $month, $cd) {
                        return $installment->agreement_of_sale_id == $contract->id &&
                            $installment->month > $month &&
                            ($installment->amount_received === null || $installment->amount_received < $cd->amount);
                    })->first();



                    if(!$currentInstallment){

                        $currentInstallment = $installments->filter(function ($installment) use ($contract, $year, $cd) {
                            return $installment->agreement_of_sale_id == $contract->id &&
                                $installment->year > $year &&
                                ($installment->amount_received === null || $installment->amount_received < $cd->amount);
                        })->first();


                    }

                }


            }else{

                $currentInstallment = $cd;
            }

            if($currentInstallment->amount_received){
                //check if amount received is enough to pay installment
                $amountToPayFirstInstallment = $currentInstallment->amount - $currentInstallment->amount_received;


            }else{

                $amountToPayFirstInstallment = $currentInstallment->amount;
            }

            $balance =  ($payment->amount_paid - $amountToPayFirstInstallment);

            if($balance > 0){

                //Update  first installment
                $currentInstallment->amount_received       = $currentInstallment->amount;
                $currentInstallment->payment_id            = $payment->id;
                $currentInstallment->is_paid_infull        = 1;
                $currentInstallment->interest_processable  = 0;
                $currentInstallment->save();

                //$balance = $payment->amount_paid - $currentInstallment->amount;

                //check if our balance is enough to pay another installment

                if($balance < $currentInstallment->amount){

                    $nextInstallment  = $installments->where('id',$currentInstallment->id + 1)->first();

                    $nextInstallment->amount_received       = $balance;
                    $nextInstallment->payment_id            = $payment->id;
                    $nextInstallment->is_paid_infull        = 1;
                    $nextInstallment->interest_processable  = 0;
                    $nextInstallment->save();

                }else{

                    //update the next installments

                    $numTimes =  intval($balance/$currentInstallment->amount);

                    for ($i = 1; $i <= $numTimes; $i++ ){

                        $beingUpdatedInstallment = $installments->where('id', $currentInstallment->id + $i)->first();

                        $beingUpdatedInstallment->payment_id            = $payment->id;
                        $beingUpdatedInstallment->is_paid_infull        = 1;
                        $beingUpdatedInstallment->interest_processable  = 0;
                        $beingUpdatedInstallment->amount_received       = $currentInstallment->amount;
                        $beingUpdatedInstallment->save();


                        $balance   = $balance - $currentInstallment->amount;

                        $remainder = $balance;
                    }

                    if($remainder > 0){

                        $remainderBeingUpdatedInstallment = $installments->where('id', $currentInstallment->id + $numTimes + 1)->first();

                        $remainderBeingUpdatedInstallment->payment_id            = $payment->id;
                        $remainderBeingUpdatedInstallment->is_paid_infull        = 1;
                        $remainderBeingUpdatedInstallment->interest_processable  = 1;
                        $remainderBeingUpdatedInstallment->amount_received       = $remainder;
                        $remainderBeingUpdatedInstallment->save();
                    }

                }

            }
            else{
                //Update  first installment
                $currentInstallment->amount_received       = $payment->amount_paid;
                $currentInstallment->payment_id            = $payment->id;
                $currentInstallment->is_paid_infull        = 1;
                $currentInstallment->interest_processable  = 0;
                $currentInstallment->save();
            }

        }

    }



    /**
     * Handle the Payment "deleted" event.
     */
    public function deleted(Payment $payment): void
    {
        $installments = Installment::where('payment_id', $payment->id)->get();

        if($installments->count() > 0){
            foreach ($installments as $installment){
                $installment->amount_received = null;
                $installment->payment_id      = null;
                $installment->save();
            }
        }

        $agreement = AgreementOfSale::find($payment->agreement_of_sale_id);
        $agreement->save();

    }


}
