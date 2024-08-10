<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::orderBy('first_name','DESC')->with('project')->get();

        foreach ($clients as $client) {
            $client->fullname = $client->first_name .' '.$client->middle_name.' ' . $client->last_name;
        }

        return Inertia::render('Clients', [
            'clients'  => $clients,
            'projects' => Project::orderBy('name','DESC')->get(),
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
            $request->validate([
                'fullname' => 'required',
                'project_id' => 'required',
            ]);

            if($request->id){
                $client = Client::find($request->id);
            }else{
                $client = new Client();
            }

            $client->project_id  = $request->project_id;
            $client->fullname    = $request->fullname;
            $client->email       = $request->email;
            $client->phone       = $request->phone;
            $client->tax_number  = $request->tax_number;
            $client->bpn_number  = $request->bpn_number;
            $client->address     = $request->address;
            $client->country     = $request->country;
            $client->state       = $request->state;
            $client->city        = $request->city;
            $client->zipcode     = $request->zipcode;
            $client->natID       = $request->natID;
            $client->dob         = $request->dob;
            $client->save();


        return back()->with('message', [
            'type'        => 'success',
            'description' => '',
            'title'        => 'Client Details Saved',
        ]);


    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();

        return back()->with('message', [
            'type'        => 'success',
            'description' => '',
            'title'        => 'Client Deleted',
        ]);
    }
}
