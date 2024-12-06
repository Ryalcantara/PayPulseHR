<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\User;
// use Spatie\Permission\Models\Permission;
use Inertia\Inertia;

class RolesAndPermissionController extends Controller
{
    public function addPermission(Request $request)
    {
        $permissions = [
            'Payroll',
            'Loans',
            'Voucher'
        ];

        foreach ($permissions as $permission) {
            // Permission::create(['name' => $permission]);
        }

        return response()->json(['message' => 'Permissions added successfully']);
    }
    public function index()
    {
        $users = User::select('name', 'id')->with('employee')->get();
        // $permissions = Permission::all();

        return inertia('Admin/RolesAndPermission', compact('employees',  'permissions', 'users'));
    }
}

