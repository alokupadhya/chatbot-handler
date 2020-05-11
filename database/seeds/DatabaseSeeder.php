<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        DB::table('user_roles')->insert([
            'type' => "admin",
        ]);
        DB::table('user_roles')->insert([
            'type' => "agent",
        ]);
        DB::table('users')->insert([
            'first_name' => Str::random(5),
            'last_name' => Str::random(5),
            'email' => 'test@gmail.com',
            'role_id' => 1,
            'password' => Hash::make('password'),
        ]);
    }
}
