<?php

namespace App\Filament\Widgets;

use App\Models\BlogPost;
use App\Models\Destination;
use App\Models\Hotel;
use App\Models\Tour;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class TourismStatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Destinations', Destination::where('is_published', true)->count())
                ->description('Published destinations')
                ->icon('heroicon-o-map-pin')
                ->color('success'),

            Stat::make('Hotels', Hotel::where('is_published', true)->count())
                ->description('Published hotels')
                ->icon('heroicon-o-building-office-2')
                ->color('info'),

            Stat::make('Tours', Tour::where('is_published', true)->count())
                ->description('Published tours')
                ->icon('heroicon-o-globe-alt')
                ->color('warning'),

            Stat::make('Blog Posts', BlogPost::where('is_published', true)->count())
                ->description('Published articles')
                ->icon('heroicon-o-newspaper')
                ->color('primary'),
        ];
    }
}
