<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    use HasFactory;
    protected $fillable = ['title','price','high_res_path','low_res_path','category_id','description'];

    protected $attributes = [
        'low_res_path' => 'images/low_res/1l.png',
        'high_res_path' => 'images/high_res/1.png',
    ];

    public function category() {

        return $this->belongsTo(Category::class);
        
    }
    public function carts() {
        return $this->hasMany(Cart::class);
        
    }
}
