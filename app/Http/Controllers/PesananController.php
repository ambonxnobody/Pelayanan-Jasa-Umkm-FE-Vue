<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Import DB dari namespace yang tepat
use App\Models\PesananModel;

class PesananController extends Controller
{
    public function tambahPesanan(Request $request)
    {
        try {
            $pesanan = new PesananModel();
            $pesanan->layanan = $request->layanan;
            $pesanan->masalah = $request->masalah;
            $pesanan->teknisi = $request->teknisi;
            $pesanan->tgl_pesan = $request->tgl_pesan;
            $pesanan->harga = $request->harga;
            $pesanan->save();

            return response()->json(['message' => 'Data pesanan berhasil disimpan.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menyimpan data pesanan: ' . $e->getMessage()], 500);
        }
    }
}
