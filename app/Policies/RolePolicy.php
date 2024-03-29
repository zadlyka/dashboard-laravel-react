<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\Permission;
use App\Models\Role;
use App\Helpers\PermissionCheck;
use Illuminate\Auth\Access\Response;

class RolePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return PermissionCheck::verify($user, Permission::Read_Role->value, null);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Role $role): bool
    {
        return PermissionCheck::verify($user, Permission::Read_Role->value, null);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return PermissionCheck::verify($user, Permission::Create_Role->value, null);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Role $role): bool
    {
        return PermissionCheck::verify($user, Permission::Update_Role->value, null);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Role $role): bool
    {
        return PermissionCheck::verify($user, Permission::Delete_Role->value, null);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Role $role): bool
    {
        return PermissionCheck::verify($user, Permission::Update_Role->value, null);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Role $role): bool
    {
        return PermissionCheck::verify($user, Permission::Delete_Role->value, null);
    }
}
