<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\District;

class DistrictController extends Controller
{
    public function index()
    {
        $districts = District::withCount(['destinations' => function ($q) {
            $q->where('is_published', true);
        }])->get();

        return response()->json($districts);
    }
}
