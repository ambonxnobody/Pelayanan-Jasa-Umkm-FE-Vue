<?php

namespace App\Http\Controllers;

use App\Models\PesananModel;
use Illuminate\Http\Request;

class RiwayanPesananController extends Controller
{
    public function getData()
    {
        $layanan = PesananModel::all();
        return response()->json($layanan);
    }
}
