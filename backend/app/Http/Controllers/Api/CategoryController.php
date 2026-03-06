<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount(['destinations' => function ($q) {
            $q->where('is_published', true);
        }])->get();

        return response()->json($categories);
    }

    public function show(string $slug)
    {
        $category = Category::where('slug', $slug)
            ->withCount(['destinations' => fn($q) => $q->where('is_published', true)])
            ->firstOrFail();

        $destinations = $category->destinations()
            ->with(['district', 'coverImage'])
            ->where('is_published', true)
            ->latest()
            ->paginate(12);

        return response()->json([
            'category' => $category,
            'destinations' => $destinations,
        ]);
    }
}
