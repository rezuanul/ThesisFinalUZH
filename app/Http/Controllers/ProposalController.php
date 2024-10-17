<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProposalOne;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ProposalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateProposalOne $request)
    {
        $auth = Auth::user();
        $meta = ['options' => $request->companies, 'optionType' => 'Companies'];
        if ($request->type == 2 && !empty($request->healthConditions)) {
            $meta['health_conditions'] = $request->healthConditions;
        }
        
        $proposal = $auth->proposals()->create([
            'creator_wallet_address' => $auth->wallet_address,
            'title' => $request->title,
            'proposal_id' => $request->proposal_id,
            'expiry' => $request->expiry,
            'type' => $request->type == 1 ? 'Proposal 1' : 'Proposal 2',
            'meta' => $meta,
        ]);

        return Redirect::back()->with('success', 'Your proposal has been created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function show(Proposal $proposal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function edit(Proposal $proposal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Proposal $proposal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Proposal  $proposal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Proposal $proposal)
    {
        //
    }
}
