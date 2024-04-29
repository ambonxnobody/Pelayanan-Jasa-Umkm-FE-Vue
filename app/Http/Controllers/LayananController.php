<?php

namespace App\Http\Controllers;
use App\Models\LayananModel;
use Illuminate\Http\Request;

class LayananController extends Controller
{
    public function getData()
    {
        $layanan = LayananModel::all();
        return response()->json($layanan);
    }
}
