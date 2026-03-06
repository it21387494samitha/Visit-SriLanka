<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\Category;
use App\Models\District;

class StatsController extends Controller
{
    public function index()
    {
        return response()->json([
            'destinations' => Destination::where('is_published', true)->count(),
            'categories' => Category::count(),
            'districts' => District::count(),
            'featured' => Destination::where('is_featured', true)->where('is_published', true)->count(),
        ]);
    }
}
