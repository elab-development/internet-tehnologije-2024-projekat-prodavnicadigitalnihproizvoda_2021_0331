<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator=Validator::make($request->all(),[
            'role' => 'in:admin,user',
            'name'=>'required|string|max:255',
            'email'=>[
                'required',
                'string',
                'max:255',
                'regex:/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/',
                'unique:users',
            ],
            'password'=>[
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/', 
                'regex:/[a-z]/', 
                'regex:/[0-9]/', 
                 ] 
     
        ]);

        if($validator->fails())
            return response()->json($validator->errors());
        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'role' => $request->role ?? User::ROLE_USER,
            'email_verified_at' => now()
        ]);

        $token=$user->createToken('auth_token')->plainTextToken;
            return response()->json(['data'=>$user, 'access_token'=>$token, 'token_type'=>'Bearer']);
    }


    public function login(Request $request) {
    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['success' => false], 401);
    }

    $user = User::where('email', $request['email'])->firstOrFail();  

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'success' => true,
        'access_token' => $token,
        'token_type' => 'Bearer',
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role, 
        ]
    ]);
}



    public function logout(Request $request)
{
    $user = $request->user();

    if ($user) {
        $user->tokens()->delete();
        return response()->json(['message' => 'Successfully logged out.']);
    }

    return response()->json(['message' => 'Not authenticated.'], 401);
}


    


}
