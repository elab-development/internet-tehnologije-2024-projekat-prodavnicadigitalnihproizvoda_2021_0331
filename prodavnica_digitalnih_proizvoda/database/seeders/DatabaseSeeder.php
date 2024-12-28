<?php

namespace Database\Seeders;
use App\Models\User;
use App\Models\Category;
use App\Models\Picture;
use App\Models\Cart;

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
        Cart::truncate();

        $user=User::factory(5)->create();


        //\App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $category1 = Category::create(['name' => 'Nature','description' => 'Experience the beauty of the natural world through stunning depictions of landscapes, wildlife, forests, mountains, rivers, and serene scenes that capture the essence of our environment. Perfect for nature lovers and those seeking a sense of tranquility.']);        
        $category2 = Category::create(['name' => 'Abstract','description' => 'Immerse yourself in a world of creativity and imagination with abstract art. Featuring bold colors, dynamic shapes, and intricate patterns, these pieces evoke emotions and inspire thought, making them perfect for modern spaces and art enthusiasts.']);         
        $category3 = Category::create(['name' => 'Portraits','description' => 'Discover the art of human expression through captivating portraits. From realistic depictions to imaginative interpretations, these artworks capture the emotions, personalities, and stories of individuals, bringing them to life with every detail.']);


        $picturesNature = [
            [
                'title' => 'Mountain Sunset',
                'low_res_path' => 'images/low_res/devetal.png',
                'high_res_path' => 'images/high_res/deveta.png',
                'price' => 150.00,
                'description' => 'A breathtaking view of the sun setting behind majestic mountains.',
            ],
            [
                'title' => 'Forest Path',
                'low_res_path' => 'images/low_res/osmal.png',
                'high_res_path' => 'images/high_res/osma.png',
                'price' => 200.00,
                'description' => 'A peaceful trail winding through a lush, green forest.',
            ],
            [
                'title' => 'Ocean Waves',
                'low_res_path' => 'images/low_res/sedmal.png',
                'high_res_path' => 'images/high_res/sedma.png',
                'price' => 175.00,
                'description' => 'Gentle waves crashing onto a serene beach at sunset.',
            ],
            [
                'title' => 'Mountain Field',
                'low_res_path' => 'images/low_res/desetal.png',
                'high_res_path' => 'images/high_res/deseta.png',
                'price' => 250.00,
                'description' => 'A vibrant field nestled between towering mountain peaks.',
            ],
            [
                'title' => 'Peaceful River',
                'low_res_path' => 'images/low_res/sestal.png',
                'high_res_path' => 'images/high_res/sesta.png',
                'price' => 190.00,
                'description' => 'A tranquil river flowing through a picturesque valley.',
            ],
        ];
        
        foreach ($picturesNature as $picture) {
            Picture::create(array_merge($picture, ['category_id' => $category1->id, 'downloads' => rand(0, 50)]));
        }
        
        $picturesAbstract = [
            [
                'title' => 'Color Burst',
                'low_res_path' => 'images/low_res/trecal.png',
                'high_res_path' => 'images/high_res/treca.png',
                'price' => 300.00,
                'description' => 'A dynamic explosion of vibrant colors and bold shapes.',
            ],
            [
                'title' => 'Geometric Chaos',
                'low_res_path' => 'images/low_res/petal.png',
                'high_res_path' => 'images/high_res/peta.png',
                'price' => 275.00,
                'description' => 'An intricate blend of geometric patterns in vivid hues.',
            ],
            [
                'title' => 'Dynamic Flow',
                'low_res_path' => 'images/low_res/cetvrtal.png',
                'high_res_path' => 'images/high_res/cetvrta.png',
                'price' => 350.00,
                'description' => 'Fluid abstract waves that evoke movement and energy.',
            ],
            [
                'title' => 'Abstract Dreams',
                'low_res_path' => 'images/low_res/drugal.png',
                'high_res_path' => 'images/high_res/druga.png',
                'price' => 400.00,
                'description' => 'A surreal mix of colors and shapes, inspiring imagination.',
            ],
            [
                'title' => 'Visionary Shapes',
                'low_res_path' => 'images/low_res/prval.png',
                'high_res_path' => 'images/high_res/prva.png',
                'price' => 320.00,
                'description' => 'Bold, visionary designs with a futuristic aesthetic.',
            ],
        ];
        
        foreach ($picturesAbstract as $picture) {
            Picture::create(array_merge($picture, ['category_id' => $category2->id, 'downloads' => rand(0, 50)]));
        }
        
        $picturesPortraits = [
            [
                'title' => 'Artistic Woman',
                'low_res_path' => 'images/low_res/petnaestal.png',
                'high_res_path' => 'images/high_res/petnaesta.png',
                'price' => 500.00,
                'description' => 'A striking portrait of a woman with an artistic flair.',
            ],
            [
                'title' => 'Boy',
                'low_res_path' => 'images/low_res/trinaestal.png',
                'high_res_path' => 'images/high_res/trinaesta.png',
                'price' => 450.00,
                'description' => 'A charming portrait capturing the innocence of youth.',
            ],
            [
                'title' => 'Robot',
                'low_res_path' => 'images/low_res/cetrnaestl.png',
                'high_res_path' => 'images/high_res/cetrnaest.png',
                'price' => 480.00,
                'description' => 'A creative depiction of a futuristic humanoid robot.',
            ],
            [
                'title' => 'Old Soul',
                'low_res_path' => 'images/low_res/jedanaestal.png',
                'high_res_path' => 'images/high_res/jedanaesta.png',
                'price' => 550.00,
                'description' => 'A moving portrait of wisdom and experience captured in an elder\'s gaze.',
            ],
            [
                'title' => 'Elegant Lady',
                'low_res_path' => 'images/low_res/dvanaestal.png',
                'high_res_path' => 'images/high_res/dvanaesta.png',
                'price' => 520.00,
                'description' => 'A refined and graceful portrayal of an elegant woman.',
            ],
        ];
        
        foreach ($picturesPortraits as $picture) {
            Picture::create(array_merge($picture, ['category_id' => $category3->id, 'downloads' => rand(0, 50)]));
        }

    }
}
