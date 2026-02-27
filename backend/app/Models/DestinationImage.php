<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DestinationImage extends Model
{
public function destination()
{
    return $this->belongsTo(Destination::class);
}



}
