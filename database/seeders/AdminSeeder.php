<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = new User();
        $admin->first_name = "Kunal";
        $admin->last_name = "Verma";
        $admin->email = "admin@transresin.in";
        $admin->mobile = "9012345678";
        $admin->password = Hash::make("admin123");
        $admin->role = "admin";
        $admin->save();
    }
}
