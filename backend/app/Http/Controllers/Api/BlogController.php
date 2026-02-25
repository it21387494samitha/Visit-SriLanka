<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = BlogPost::with(['author:id,name', 'category', 'media'])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());

        if ($request->filled('category')) {
            $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        }

        if ($request->filled('tag')) {
            $query->whereJsonContains('tags', $request->tag);
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%'.$request->search.'%')
                  ->orWhere('excerpt', 'like', '%'.$request->search.'%');
            });
        }

        $posts = $query
            ->latest('published_at')
            ->paginate($request->get('per_page', 10));

        return response()->json($posts);
    }

    public function show(BlogPost $blog): JsonResponse
    {
        abort_unless($blog->is_published, 404);

        $blog->load(['author:id,name', 'category', 'media']);

        return response()->json($blog);
    }
}
