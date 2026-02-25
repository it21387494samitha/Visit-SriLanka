<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DestinationController;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\TourController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BlogController;

/*
|--------------------------------------------------------------------------
| API Routes  (prefix: /api/v1)
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // ── Public endpoints ────────────────────────────────────────────────

    // Destinations
    Route::apiResource('destinations', DestinationController::class)->only(['index', 'show']);

    // Hotels
    Route::apiResource('hotels', HotelController::class)->only(['index', 'show']);

    // Tours
    Route::apiResource('tours', TourController::class)->only(['index', 'show']);

    // Categories
    Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);

    // Blog
    Route::apiResource('blog', BlogController::class)->only(['index', 'show']);

    // ── Protected endpoints (Sanctum) ────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', fn(Request $request) => $request->user());
    });
});
