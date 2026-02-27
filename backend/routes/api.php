<?php

use App\Http\Controllers\Api\DestinationController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DistrictController;
use App\Http\Controllers\Api\StatsController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/destinations', [DestinationController::class, 'index']);
    Route::get('/destinations/featured', [DestinationController::class, 'featured']);
    Route::get('/destinations/{slug}', [DestinationController::class, 'show']);

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{slug}', [CategoryController::class, 'show']);

    Route::get('/districts', [DistrictController::class, 'index']);

    Route::get('/stats', [StatsController::class, 'index']);
});
