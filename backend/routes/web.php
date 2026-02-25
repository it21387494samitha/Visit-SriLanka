<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Visit Sri Lanka API', 'version' => '1.0']);
});
