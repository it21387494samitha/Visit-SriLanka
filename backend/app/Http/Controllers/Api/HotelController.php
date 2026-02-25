<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Hotel::with('media')
            ->where('is_published', true);

        if ($request->filled('province')) {
            $query->where('province', $request->province);
        }

        if ($request->filled('district')) {
            $query->where('district', $request->district);
        }

        if ($request->filled('min_stars')) {
            $query->where('star_rating', '>=', $request->min_stars);
        }

        if ($request->filled('max_price')) {
            $query->where('price_per_night', '<=', $request->max_price);
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }

        $hotels = $query
            ->orderBy($request->get('sort_by', 'star_rating'), $request->get('sort_dir', 'desc'))
            ->paginate($request->get('per_page', 12));

        return response()->json($hotels);
    }

    public function show(Hotel $hotel): JsonResponse
    {
        abort_unless($hotel->is_published, 404);

        $hotel->load(['destinations', 'media']);

        return response()->json($hotel);
    }
}
