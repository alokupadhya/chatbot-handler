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

        // role 
        DB::table('user_roles')->insert([
            'type' => "admin",
        ]);
        DB::table('user_roles')->insert([
            'type' => "agent",
        ]);

        // work status
        DB::table('user_work_status')->insert([
            'type' => "offline",
        ]);
        DB::table('user_work_status')->insert([
            'type' => "idle",
        ]);
        DB::table('user_work_status')->insert([
            'type' => "busy",
        ]);


        // admin
        DB::table('users')->insert([
            'first_name' => Str::random(5),
            'last_name' => Str::random(5),
            'email' => 'test@gmail.com',
            'role_id' => 1,
            'password' => Hash::make('password'),
        ]);

        // admin
        DB::table('users')->insert([
            'first_name' => Str::random(5),
            'last_name' => Str::random(5),
            'email' => 'agent@gmail.com',
            'role_id' => 2,
            'password' => Hash::make('agentpassword'),
        ]);

        // admin
        DB::table('bot_questions')->insert([
            'qa' => "This is the root question of the chat bot. You can edit it by clicking on edit button on right side." ,
            'type' => 0,
        ]);
    }
}
