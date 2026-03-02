<?php

namespace Database\Seeders;

use App\Models\Season;
use Illuminate\Database\Seeder;

class SeasonSeeder extends Seeder
{
    public function run(): void
    {
        $seasons = [
            ['title' => 'Season 4', 'sort_order' => 4, 'is_active' => true],
            ['title' => 'Season 5', 'sort_order' => 5, 'is_active' => true],
            ['title' => 'Season 6', 'sort_order' => 6, 'is_active' => true],
        ];

        foreach ($seasons as $season) {
            Season::firstOrCreate(['title' => $season['title']], $season);
        }
    }
}
