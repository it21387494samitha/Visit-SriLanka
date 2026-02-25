<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Destination::with(['category', 'media'])
            ->where('is_published', true);

        if ($request->filled('category')) {
            $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        }

        if ($request->filled('province')) {
            $query->where('province', $request->province);
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }

        $destinations = $query
            ->orderBy($request->get('sort_by', 'name'), $request->get('sort_dir', 'asc'))
            ->paginate($request->get('per_page', 12));

        return response()->json($destinations);
    }

    public function show(Destination $destination): JsonResponse
    {
        abort_unless($destination->is_published, 404);

        $destination->load(['category', 'hotels', 'tours', 'media']);

        return response()->json($destination);
    }
}
