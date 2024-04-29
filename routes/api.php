<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Login Route
Route::post('login', 'App\Http\Controllers\LoginController@cekLogin');

// Pesanan Route
Route::post('submit-pesanan', 'App\Http\Controllers\PesananController@tambahPesanan');

Route::get('nama-elektronik', 'App\Http\Controllers\LayananController@getData');

Route::get('riwayat-pesanan', 'App\Http\Controllers\RiwayanPesananController@getData');

// Logout Route
Route::middleware('auth:api')->post('logout', 'App\Http\Controllers\LoginController@logout');

// Get User Details
Route::middleware('auth:api')->get('user', function (Request $request) {
    return $request->user();
});
