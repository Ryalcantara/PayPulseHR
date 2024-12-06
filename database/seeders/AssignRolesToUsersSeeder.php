<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
// use Spatie\Permission\Models\Permission;
// use Spatie\Permission\Models\Role;

class AssignRolesToUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create permissions
        $permission1 = Permission::create(['name' => 'view payroll']);
        $permission2 = Permission::create(['name' => 'edit employee']);
        $permission3 = Permission::create(['name' => 'view employee']);
        $permission4 = Permission::create(['name' => 'manage payroll']);

        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $accRole = Role::create(['name' => 'accounting']);
        $cashierRole = Role::create(['name' => 'cashier']);
        $hrRole = Role::create(['name' => 'hr']);
        $employeeRole = Role::create(['name' => 'employee']);

        // Assign permissions to roles
        $adminRole->givePermissionTo([$permission1, $permission2, $permission3, $permission4]);
        $accRole->givePermissionTo([$permission1, $permission2]); // Example for accounting role
        $cashierRole->givePermissionTo([$permission1]); // Example for cashier role
        $hrRole->givePermissionTo([$permission1, $permission3]); // Example for hr role
        $employeeRole->givePermissionTo([$permission1, $permission3]); // Example for employee role

        // Assign roles to users (example for users with specific IDs)
        $user = User::find(1);
        if ($user) {
            $user->assignRole('admin');
        }

        $user2 = User::find(2);
        if ($user2) {
            $user2->assignRole('accounting');
        }

        $user3 = User::find(3);
        if ($user3) {
            $user3->assignRole('cashier');
        }

        // Add other users as needed
    }
}
