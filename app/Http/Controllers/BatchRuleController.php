<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use App\Models\BatchRule;
use Illuminate\Http\Request;

class BatchRuleController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'project_id'               => 'required',
            'batch_id'                 => 'required',
            'start_date'               => 'required|date',
            'end_date'                 => 'required|date:greater_than:start_date',
            'installment_amount'       => 'required',
            'calculate_penalty'        => 'required',
            'calculate_penalty_after'  => 'required',
        ]);

        if($request->id){
            $batchrule = BatchRule::find($request->id);
        }else{
            $batchrule = new BatchRule();
        }


        $batchrule->project_id = $request->project_id;
        $batchrule->batch_id = $request->batch_id;
        $batchrule->start_date = $request->start_date;
        $batchrule->end_date = $request->end_date;
        $batchrule->installment_amount = $request->installment_amount;
        $batchrule->calculate_penalty = $request->calculate_penalty;
        $batchrule->calculate_penalty_after = $request->calculate_penalty_after;


        $batchrule->save();

        return back()->with('message', [
            'type'        => 'success',
            'description' => '',
            'title'        => 'Batch Rule Added',
        ]);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BatchRule $batchRule)
    {
        $batchRule->delete();

        return back()->with('message', [
            'type'        => 'success',
            'description' => '',
            'title'        => 'Batch Deleted',
        ]);
    }
}
