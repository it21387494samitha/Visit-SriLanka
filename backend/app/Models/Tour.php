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

class Tour extends Model implements HasMedia
{
    use HasFactory, HasSlug, InteractsWithMedia, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'short_description',
        'duration_days',
        'price',
        'max_group_size',
        'difficulty',
        'highlights',
        'includes',
        'excludes',
        'itinerary',
        'is_featured',
        'is_published',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'duration_days'  => 'integer',
        'price'          => 'decimal:2',
        'max_group_size' => 'integer',
        'highlights'     => 'array',
        'includes'       => 'array',
        'excludes'       => 'array',
        'itinerary'      => 'array',
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
