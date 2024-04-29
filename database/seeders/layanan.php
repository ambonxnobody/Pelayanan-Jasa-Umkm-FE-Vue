<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;

class Layanan extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'layanan' => 'mesin_cuci',
                'deskripsi' => 'Mesin Cuci',
                'gambar' => '',
                'harga' => 50000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'layanan' => 'televisi',
                'deskripsi' => 'Televisi',
                'gambar' => '',
                'harga' => 40000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'layanan' => 'laptop',
                'deskripsi' => 'Laptop',
                'gambar' => '',
                'harga' => 45000,
                'created_at' => now(),
                'updated_at' => now()
            ],

        ];
        DB::table('layanan')->insert($data);
    }
}
