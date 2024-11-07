<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    protected function generateReferralCode()
    {
        // Generate a random 8-character code
        $code = strtoupper(Str::random(8));

        // Check if the generated code already exists in the database
        while (User::where('refer_code', $code)->exists()) {
            // If it exists, generate a new code
            $code = strtoupper(Str::random(8));
        }

        return $code;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $users = $query->latest()->get();

        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'mobile' => 'required|unique:users,mobile',
            'password' => 'required|string|min:5',
        ]);

        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->mobile = $request->mobile;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        // Send verification email
        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Success! Registration successful! Please check your email to verify your account.'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email,' . $user->id,
            'mobile' => 'required|unique:users,mobile,' . $user->id,
            'password' => 'required|string|min:5',
        ]);


        $user->name = $request->name;
        $user->mobile = $request->mobile;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'message' => 'Success! A new record has been added.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'Success! A new record has been deleted.'
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'password' => 'required|confirmed'
        ]);

        $user = $request->user();
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'message' => 'Success! Your password has been changed.',
        ]);
    }
}
