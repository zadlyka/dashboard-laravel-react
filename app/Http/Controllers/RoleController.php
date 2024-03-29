<?php

namespace App\Http\Controllers;

use App\Enums\Permission;
use Inertia\Inertia;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Role::class, 'role');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort =  $request->input('sort');
        $filter =  $request->input('filter');

        $paginate = Role::search($search)->sort($sort)->filter($filter)->simplePaginate(5);

        return Inertia::render('Role/Index', [
            'paginate' => $paginate,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::cases();
        $temp = array();

        foreach ($permissions as $permission) {
            array_push($temp, (object) [
                'value' => $permission->value,
                'label' => str_replace("_", " ", $permission->name)
            ]);
        }

        return Inertia::render('Role/Create', [
            'options' => [
                'permissions' => $temp,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        $data = $request->safe()->all();
        Role::create($data);
        return Redirect::route('role');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        return Inertia::render('Role/Show', ['role' => $role]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        $permissions = Permission::cases();
        $temp = array();

        foreach ($permissions as $permission) {
            array_push($temp, (object) [
                'value' => $permission->value,
                'label' => str_replace("_", " ", $permission->name)
            ]);
        }

        return Inertia::render('Role/Edit',  [
            'role' => $role,
            'options' => [
                'permissions' => $temp
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $data = $request->safe()->all();
        $role->update($data);
        return Redirect::route('role');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return Redirect::route('role');
    }
}
