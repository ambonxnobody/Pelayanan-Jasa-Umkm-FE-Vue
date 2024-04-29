<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;

class user extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Admin',
                'username' => 'admin',
                'password' =>  Hash::make('admin'),
                'role' => '1',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Teknisi',
                'username' => 'alda',
                'password' =>  Hash::make('alda'),
                'role' => '2',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Pembeli',
                'username' => 'clara',
                'password' =>  Hash::make('clara'),
                'role' => '3',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];
        DB::table('users')->insert($data);
    }
}
