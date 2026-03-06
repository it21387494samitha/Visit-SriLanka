<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index(Request $request)
    {
        $query = Destination::with(['category', 'district', 'coverImage'])
            ->where('is_published', true);

        if ($request->has('category')) {
            $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        }

        if ($request->has('district')) {
            $query->whereHas('district', fn($q) => $q->where('slug', $request->district));
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%");
            });
        }

        $destinations = $query->latest()->paginate($request->get('per_page', 12));

        return response()->json($destinations);
    }

    public function featured()
    {
        $destinations = Destination::with(['category', 'district', 'coverImage'])
            ->where('is_published', true)
            ->where('is_featured', true)
            ->latest()
            ->take(8)
            ->get();

        return response()->json($destinations);
    }

    public function show(string $slug)
    {
        $destination = Destination::with(['category', 'district', 'images'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $related = Destination::with(['category', 'coverImage'])
            ->where('category_id', $destination->category_id)
            ->where('id', '!=', $destination->id)
            ->where('is_published', true)
            ->take(4)
            ->get();

        return response()->json([
            'destination' => $destination,
            'related' => $related,
        ]);
    }
}
