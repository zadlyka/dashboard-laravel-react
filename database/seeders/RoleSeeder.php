<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Enums\RoleId;
use App\Enums\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::factory()->create([
            'id' => RoleId::Administrator->value,
            'name' => RoleId::Administrator->name,
            'permissions' => [
                (object) [
                    'value' => Permission::Manage_All->value,
                    'label' => str_replace("_", " ", Permission::Manage_All->name)
                ]
            ]
        ]);

        Role::factory()->create([
            'id' => RoleId::Basic->value,
            'name' => RoleId::Basic->name,
            'permissions' =>  [
                (object) [
                    'value' => Permission::Manage_Category->value,
                    'label' => str_replace("_", " ", Permission::Manage_Category->name)
                ],

            ]
        ]);
    }
}
