<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    public function category()
{
    return $this->belongsTo(Category::class);
}

public function district()
{
    return $this->belongsTo(District::class);
}

public function images()
{
    return $this->hasMany(DestinationImage::class);
}

public function coverImage()
{
    return $this->hasOne(DestinationImage::class)->where('is_cover', true);
}



protected $fillable = [
    'category_id',
    'district_id',
    'title',
    'slug',
    'summary',
    'description',
    'latitude',
    'longitude',
    'best_months',
    'is_featured',
    'is_published',
];

}




