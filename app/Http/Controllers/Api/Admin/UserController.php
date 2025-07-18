<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Spatie\Permission\Models\Role;
use App\Http\Resources\UserResource;
use App\Http\Resources\RoleResource;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::with('roles')
            ->orderBy($request->query('sortBy', 'name'), $request->query('sortOrder', 'asc'))
            ->paginate($request->query('perPage', 10));

        return Inertia::render('Users/Index', [
            'users' => UserResource::collection($users),
        ]);
    }

    public function create()
    {
        $availableRoles = Role::all();

        return Inertia::render('Users/Create', [
            'availableRoles' => RoleResource::collection($availableRoles)->toArray(request()),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', Password::defaults(), 'confirmed'],
            'roles' => 'array',
            'roles.*' => 'exists:roles,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($request->has('roles')) {
            $roles = Role::whereIn('id', $request->input('roles'))->get();
            $user->syncRoles($roles);
        }

        return redirect()->route('admin.users.index')->with('success', 'User created successfully!');
    }

    public function show(User $user)
    {
        return new UserResource($user->load('roles'));
    }

    public function edit(User $user)
    {
        $user->load('roles');
        $availableRoles = Role::all();
        return Inertia::render('Users/Edit', [
            'user' => new UserResource($user),
            'availableRoles' => RoleResource::collection($availableRoles)->toArray(request()),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'roles' => 'array',
            'roles.*' => 'exists:roles,id',
        ];

        if ($request->filled('password')) {
            $rules['password'] = ['required', Password::defaults(), 'confirmed'];
        }

        $validatedData = $request->validate($rules);

        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];

        if ($request->filled('password')) {
            $user->password = Hash::make($validatedData['password']);
        }

        $user->save();

        if ($request->has('roles')) {
            $roles = Role::whereIn('id', $request->input('roles'))->get();
            $user->syncRoles($roles);
        } else {
            $user->syncRoles([]);
        }

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully!');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully!');
    }

    public function getRoles()
    {
        return RoleResource::collection(Role::all());
    }
}
