<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Basic;
use Illuminate\Http\Request;
use App\Events\ProcessNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Basic\StoreBasicRequest;
use App\Http\Requests\Basic\UpdateBasicRequest;

class BasicController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Basic::class, 'basic');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort =  $request->input('sort');
        $filter =  $request->input('filter');

        $paginate = Basic::search($search)->sort($sort)->filter($filter)->simplePaginate(5);

        return Inertia::render('Basic/Index', [
            'paginate' => $paginate,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Basic/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBasicRequest $request)
    {
        $data = $request->safe()->all();
        Basic::create($data);

        //sample send notification
        event(new ProcessNotification(Auth::user(), 'test'));
        return Redirect::route('basic');
    }

    /**
     * Display the specified resource.
     */
    public function show(Basic $basic)
    {
        return Inertia::render('Basic/Show', ['basic' => $basic]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Basic $basic)
    {
        return Inertia::render('Basic/Edit',  [
            'basic' => $basic,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBasicRequest $request, Basic $basic)
    {
        $data = $request->safe()->all();
        $basic->update($data);
        return Redirect::route('basic');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Basic $basic)
    {
        $basic->delete();
        return Redirect::route('basic');
    }
}
