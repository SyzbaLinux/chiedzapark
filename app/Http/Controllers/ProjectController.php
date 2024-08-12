<?php

namespace App\Http\Controllers;

use App\Models\AgreementOfSale;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         return Inertia::render('Projects', [
             'projects' => Project::all()
         ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if($request->id){
            $project = Project::find($request->id);
        }else{
            $project = new Project();
        }

        $project->name = $request->name;
        $project->slug = $request->name;
        $project->description = $request->description;
        $project->save();

        return back()->with('message', [
            'type'        => 'success',
            'description' => '',
            'title'        => 'Project Details Saved',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return Inertia::render('ViewProject',[
            'project'    => $project->load([
                                                'active.client',
                                                'active.stand',
                                                'cancelled.client',
                                                'cancelled.stand',
                                                'batches.rules'
                                            ]),
        ]);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return back()->with('message', [
            'type'        => 'success',
            'description' => '',
            'title'        => 'Project Deleted',
        ]);
    }
}
