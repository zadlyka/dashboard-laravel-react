<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\Permission;
use App\Models\Basic;
use App\Helpers\PermissionCheck;
use Illuminate\Auth\Access\Response;

class BasicPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return PermissionCheck::verify($user, Permission::Read_Basic->value, null);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Basic $basic): bool
    {
        return PermissionCheck::verify($user, Permission::Read_Basic->value, null);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return PermissionCheck::verify($user, Permission::Create_Basic->value, null);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Basic $basic): bool
    {
        return PermissionCheck::verify($user, Permission::Update_Basic->value, null);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Basic $basic): bool
    {
        return PermissionCheck::verify($user, Permission::Delete_Basic->value, null);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Basic $basic): bool
    {
        return PermissionCheck::verify($user, Permission::Update_Basic->value, null);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Basic $basic): bool
    {
        return PermissionCheck::verify($user, Permission::Delete_Basic->value, null);
    }
}
