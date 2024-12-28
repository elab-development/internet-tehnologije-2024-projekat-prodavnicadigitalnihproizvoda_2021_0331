<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Picture;

class CategoryController extends Controller
{
    public function index($category_id)
    {
        $pictures = Picture::get()->where('category_id',$category_id);
        if(is_null($pictures))
            return response()->json('Data not found',404);
        return response()->json($pictures);
    }
}
