<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Hotel extends Model implements HasMedia
{
    use HasFactory, HasSlug, InteractsWithMedia, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'short_description',
        'address',
        'province',
        'district',
        'latitude',
        'longitude',
        'star_rating',
        'price_per_night',
        'amenities',
        'contact_email',
        'contact_phone',
        'website',
        'is_featured',
        'is_published',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'latitude'       => 'float',
        'longitude'      => 'float',
        'star_rating'    => 'integer',
        'price_per_night'=> 'decimal:2',
        'amenities'      => 'array',
        'is_featured'    => 'boolean',
        'is_published'   => 'boolean',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function destinations(): BelongsToMany
    {
        return $this->belongsToMany(Destination::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('hero')->singleFile()->useDisk('public');
        $this->addMediaCollection('gallery')->useDisk('public');
    }
}
