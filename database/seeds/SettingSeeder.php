<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = json_encode(['SinoVac', 'Moderna', 'Pfizer', 'GSK', 'Sanofi', 'AstraZeneca']);
        $healthConditions = json_encode(['Major Surgery', 'Mental Problem', 'Allergy', 'Chronic Illnesses', 'Neurological Disorders']);
        Setting::create([
            'key' => 'companies',
            'value' => $names,
        ]);

        Setting::create([
            'key' => 'health_conditions',
            'value' => $healthConditions,
        ]);
    }
}
