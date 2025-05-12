<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Picture;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all(), 200);
    }

    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json($category, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string'
        ]);

        $category = Category::create($validated);

        return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);
    }

    public function destroy($id)
{
    $category = Category::find($id);

    if (!$category) {
        return response()->json(['error' => 'Category not found'], 404);
    }

    
    $hasPictures = Picture::where('category_id', $id)->exists();

    if ($hasPictures) {
        return response()->json(['error' => 'Cannot delete category with assigned pictures'], 400);
    }

    $category->delete();

    return response()->json(['message' => 'Category deleted successfully'], 200);
}
}
