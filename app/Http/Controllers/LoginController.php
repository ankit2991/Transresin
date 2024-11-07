<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function doLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|exists:users,email'
        ], ['email.exists' => 'Login failed! Email doesn\'t exists.']);

        $user = User::where('email', $request->email)->first();

        if (!empty($user->email_verified_at)) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken("AUTH_TOKEN");

                return response()->json([
                    'message'   => 'Login success! You\'re logged in now.',
                    'token'     => $token->plainTextToken,
                    'user' => $user
                ], 201);
            } else {
                return response()->json([
                    'message'       => 'Login failed! Password is not correct.',
                    'login_status'  => "INCORRECT_PASSWORD"
                ], 403);
            }
        } else {
            return response()->json([
                'message'       => 'Login failed! Email is not verified.',
                'login_status'  => "NOT_VERIFIED"
            ], 403);
        }
    }

    public function doLogout(Request $request)
    {
        if ($request->type == "all_logout")
            $request->user()->tokens()->delete();
        else
            $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Success! You have been logged out.'
        ]);
    }
}
