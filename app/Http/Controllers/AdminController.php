<?php

namespace App\Http\Controllers;

use App\Models\AgreementOfSale;
use App\Models\Batch;
use App\Models\Client;
use App\Models\Installment;
use App\Models\Payment;
use App\Models\Project;
use App\Models\Stand;
use App\Observers\PaymentObserver;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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


     public function users()
     {
         //To handle users
     }

    public function clientContracts($client)
    {
            return AgreementOfSale::where('client_id',$client)->get();
    }

    function cancelledContracts(){
        return Inertia::render('CancelledContracts',[
            'contracts' => AgreementOfSale::where('is_cancelled',1)->with(['client','project'])->get()
        ]);
    }


    public function report()
    {
        return Inertia::render('GenerateReport',[
            'projects' => Project::orderBy('name','DESC')->get(),
            'clients' => Client::orderBy('first_name','DESC')->get(),
            'start_date' => date('Y-m-01'),
            'end_date' => date('Y-m-t'),
        ]);
    }

    public function generateReported(Request $request){

        $request->validate([
            'project_id' => 'required'
        ]);

        $project_name = $request->project_id ? \App\Models\Project::find($request->project_id)->name : 'From Different projects';
        $client_name  =  $request->client_id ? \App\Models\Client::find($request->client_id)->first_name . ' ' . \App\Models\Client::find($request->client_id)->last_name : 'From Different Clients';


        $agreements = \App\Models\AgreementOfSale::query()
                        ->where('is_cancelled',0)
                        ->when($request->project_id, function ($query, $project_id) {
                            return $query->where('project_id', $project_id);
                        })
                        ->get();

        $totalCancelled =  \App\Models\AgreementOfSale::query()
                                ->where('is_cancelled',1)
                                ->when($request->project_id, function ($query, $project_id) {
                                    return $query->where('project_id', $project_id);
                                })
                                ->count();

        $totalExpectedAmount   = 0;
        $totalPenalty   = 0;
        $totalPaid   = 0;
        $totalBalance   = 0;
        $allExpectedPayments   = 0;

          return  Inertia::render('GeneratedReport',[
             'start_date'           =>  date('d-F-Y',strtotime($request->start_date)),
             'end_date'             =>  date('d-F-Y',strtotime( $request->end_date)),
             'project_name'         =>  $project_name,
             'client_name'          =>  $client_name,
             'totalExpectedAmount'  =>  number_format($totalExpectedAmount,2),
             'totalPenalty'         =>  number_format($totalPenalty,2),
             'totalPaid'            =>  number_format($totalPaid,2),
             'totalBalance'         =>  number_format($totalBalance,2),
             'activeNumber'         =>  $agreements->count(),
             'cancelledNumber'      =>  $totalCancelled,
          ]);




        //  return  Inertia::render('GeneratedReport',[
        //     'start_date'           =>  date('d-F-Y',strtotime($request->start_date)),
        //     'end_date'             =>  date('d-F-Y',strtotime( $request->end_date)),
        //     'project_name'         =>  $project_name,
        //     'client_name'          =>  $client_name,
        //     'totalExpectedAmount'  =>  number_format($totalExpectedAmount,2),
        //     'totalPenalty'         =>  number_format($totalPenalty,2),
        //     'totalPaid'            =>  number_format($totalPaid,2),
        //     'totalBalance'         =>  number_format($totalBalance,2),
        //     'allExpectedPayments'  =>  $allExpectedPayments
        //  ]);
    }




    public function generateReport(Request $request){

         return Installment::where('project_id',$request->project_id)->sum('amount');
//
//         set_time_limit(5550);
//         $this->resetSchedules($request->project_id);
//        return 1;
    }


    public function resetSchedules($project){

        AgreementOfSale::where('project_id', $project)
            ->where('is_cancelled', 0)
            ->chunk(100, function ($agreements) {
                foreach ($agreements as $agreement) {
                    $this->recreateSchedule($agreement);
                }
            });
    }

    public   function recreateSchedule($contract)
    {
        //Delete existing installments
        Installment::where('client_id',$contract->client_id)->delete();
        $batch   = Batch::find($contract->batch)->load('rules');
        foreach ($batch->rules as $rule){
            //create installment for the period
            $this->createSchedule($rule,$contract);
        }

        return 1;
    }

    public function createSchedule($rule,$contract)
    {
        $start_date = Carbon::parse($rule->start_date);
        $end_date   = Carbon::parse($rule->end_date);
        $start_date->startOfMonth();

        $period = $start_date->diffInMonths($end_date);

        for ($i = 0; $i < $period; $i++) {

            $installmentDate        = $start_date->copy()->addMonths($i);
            $installment            = new Installment();
            $installment->interest_processable = $rule->calculate_penalty;
            $installment->amount               = $rule->installment_amount;
            $installment->project_id           = $contract->project_id;
            $installment->client_id            = $contract->client_id;
            $installment->stand_id             = $contract->stand_id;
            $installment->agreement_of_sale_id = $contract->id;
            $installment->month                = $installmentDate->month; // Extract the month
            $installment->year                 = $installmentDate->year;  // Extract the year
            $installment->fulldate             = $installmentDate->year.'-'.$installmentDate->month.'-'.$rule->calculate_penalty_after;
            $installment->save();

        }

        return $installment;
    }

}
