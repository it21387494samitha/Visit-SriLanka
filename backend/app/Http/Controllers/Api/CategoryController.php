<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $categories = Category::where('is_active', true)
            ->withCount(['destinations' => fn($q) => $q->where('is_published', true)])
            ->orderBy('name')
            ->get();

        return response()->json($categories);
    }

    public function show(Category $category): JsonResponse
    {
        abort_unless($category->is_active, 404);

        $category->load(['destinations' => fn($q) => $q->where('is_published', true)->with('media')]);

        return response()->json($category);
    }
}
