<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        $data = [
            'title' => 'Login'
        ];
        return view('login', $data);
    }

    public function cekLogin(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();
            return response()->json(['data' => $user]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }


    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        return redirect('/');
    }
}
