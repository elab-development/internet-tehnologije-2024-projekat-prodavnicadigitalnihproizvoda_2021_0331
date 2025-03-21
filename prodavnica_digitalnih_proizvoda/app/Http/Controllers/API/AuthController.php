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

      if(!Auth::attempt($request->only('email','password')))  
         return response()->json(['success'=>false]);

      $user = User::where('email',$request['email'])->firstOrFail();  
      
      $token = $user->createToken('auth_token')->plainTextToken;
      
        return response()->json(['success'=>true,'access_token'=>$token,'token_type'=>'Bearer']) ;
   

    }

    public function logout() {
        auth()->user()->tokens()->delete();
        return[
            'message'=>'You have successfully logged out and the token was successfully deleted'
        ];
    }

    


}
