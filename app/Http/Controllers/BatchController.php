<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use Illuminate\Http\Request;

class BatchController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $request->validate([
             'name' => 'required',
             'project_id' => 'required',
         ]);

         if($request->id){
             $batch = Batch::find($request->id);
         }else{
             $batch = new Batch();
         }

         $batch->name = $request->name;
         $batch->project_id = $request->project_id;
         $batch->save();

        return back()->with('message', [
            'type'        => 'success',
            'description' => '',
            'title'        => 'Batch Added Successfully',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Batch $batch)
    {
        //
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Batch $batch)
    {
        $batch->delete();

        return back()->with('message', [
            'type'        => 'success',
            'description' => '',
            'title'        => 'Batch Deleted',
        ]);
    }
}
