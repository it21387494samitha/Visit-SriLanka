<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tour;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TourController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Tour::with('media')
            ->where('is_published', true);

        if ($request->filled('max_days')) {
            $query->where('duration_days', '<=', $request->max_days);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->filled('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }

        $tours = $query
            ->orderBy($request->get('sort_by', 'price'), $request->get('sort_dir', 'asc'))
            ->paginate($request->get('per_page', 12));

        return response()->json($tours);
    }

    public function show(Tour $tour): JsonResponse
    {
        abort_unless($tour->is_published, 404);

        $tour->load(['destinations', 'media']);

        return response()->json($tour);
    }
}
