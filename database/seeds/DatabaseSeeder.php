<?php

use Database\Seeders\SettingSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {   
        $this->call([
            SettingSeeder::class,
        ]);
    }
}
