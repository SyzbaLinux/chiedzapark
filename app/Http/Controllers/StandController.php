<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Stand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Stands', [
            'stands' => Stand::orderBy('stand_number','DESC')->with('project')->get(),
            'projects' => Project::orderBy('name','DESC')->get(),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $request->validate([
           'stand_number' => 'required |unique:stands,stand_number',
           'price'        => 'required',
           'project_id'   =>'required'
       ]);

       if ($request->id) {
           $stand = Stand::find($request->id);
       }else{
           $stand = new Stand();
       }

        $stand->stand_number          = $request->stand_number;
        $stand->price                 = $request->price;
        $stand->project_id            = $request->project_id;
        $stand->client_id             = $request->client_id;
        $stand->invoice_id            = $request->invoice_id;
        $stand->agreement_of_sale_id  = $request->agreement_of_sale_id;
        $stand->square_metres         = $request->square_metres;
        $stand->electrification_costs = $request->electrification_costs;
        $stand->description           = $request->description;
        $stand->listing_date          = $request->listing_date;
        $stand->is_taken              = $request->is_taken;
        $stand->custom_price          = $request->custom_price;
        $stand->save();

        return back()->with('message', [
            'type'        => 'success',
            'description' => '',
            'title'        => 'Stand Details Saved',
        ]);


    }

    /**
     * Display the specified resource.
     */
    public function show(Stand $stand)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stand $stand)
    {
        $stand->delete();

        return back()->with('message', [
            'type'        => 'success',
            'description' => '',
            'title'        => 'Stand Deleted',
        ]);
    }
}
