<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'manage users']);

        Permission::create(['name' => 'manage blog posts']);
        Permission::create(['name' => 'delete blog posts']);
        Permission::create(['name' => 'manage blog tags']);

        Permission::create(['name' => 'manage products']);
        Permission::create(['name' => 'delete products']);
        Permission::create(['name' => 'manage product categories']);

        Permission::create(['name' => 'manage agents']);
        Permission::create(['name' => 'manage auction items']);

        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        $editorRole = Role::create(['name' => 'editor']);
        $editorRole->givePermissionTo(['manage blog posts', 'manage blog tags', 'manage products', 'manage product categories', 'manage agents', 'manage auction items']);

        $this->command->info('Roles and permissions seeded successfully!');
    }
}
