<?php

namespace Database\Seeders;
use App\Models\User;
use App\Models\Category;
use App\Models\Picture;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        Category::truncate();
        User::truncate();
        Picture::truncate();

        $user=User::factory()->create();


        //\App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $category1 = Category::create(['name' => 'Nature','description' => 'Experience the beauty of the natural world through stunning depictions of landscapes, wildlife, forests, mountains, rivers, and serene scenes that capture the essence of our environment. Perfect for nature lovers and those seeking a sense of tranquility.']);        
        $category2 = Category::create(['name' => 'Abstract','description' => 'Immerse yourself in a world of creativity and imagination with abstract art. Featuring bold colors, dynamic shapes, and intricate patterns, these pieces evoke emotions and inspire thought, making them perfect for modern spaces and art enthusiasts.']);         
        $category3 = Category::create(['name' => 'Portraits','description' => 'Discover the art of human expression through captivating portraits. From realistic depictions to imaginative interpretations, these artworks capture the emotions, personalities, and stories of individuals, bringing them to life with every detail.']);


    }
}
