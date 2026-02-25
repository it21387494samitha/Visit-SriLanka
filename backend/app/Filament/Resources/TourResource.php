<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TourResource\Pages;
use App\Models\Tour;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TourResource extends Resource
{
    protected static ?string $model = Tour::class;
    protected static ?string $navigationIcon = 'heroicon-o-globe-alt';
    protected static ?string $navigationGroup = 'Tourism';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Tabs::make('Tour')->tabs([

                Forms\Components\Tabs\Tab::make('General')->schema([
                    Forms\Components\TextInput::make('name')->required()->maxLength(255),
                    Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
                    Forms\Components\Textarea::make('short_description')->rows(3)->columnSpanFull(),
                    Forms\Components\RichEditor::make('description')->columnSpanFull(),
                ]),

                Forms\Components\Tabs\Tab::make('Details')->schema([
                    Forms\Components\TextInput::make('duration_days')->numeric()->required(),
                    Forms\Components\TextInput::make('price')->numeric()->prefix('USD')->required(),
                    Forms\Components\TextInput::make('max_group_size')->numeric(),
                    Forms\Components\Select::make('difficulty')
                        ->options(['easy' => 'Easy', 'moderate' => 'Moderate', 'challenging' => 'Challenging']),
                    Forms\Components\TagsInput::make('highlights'),
                    Forms\Components\TagsInput::make('includes'),
                    Forms\Components\TagsInput::make('excludes'),
                    Forms\Components\KeyValue::make('itinerary')
                        ->keyLabel('Day')->valueLabel('Activities')->columnSpanFull(),
                ]),

                Forms\Components\Tabs\Tab::make('SEO')->schema([
                    Forms\Components\TextInput::make('meta_title')->maxLength(70),
                    Forms\Components\Textarea::make('meta_description')->rows(3)->maxLength(160),
                ]),

                Forms\Components\Tabs\Tab::make('Publish')->schema([
                    Forms\Components\Toggle::make('is_featured'),
                    Forms\Components\Toggle::make('is_published'),
                ]),
            ])->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('duration_days')->suffix(' days')->sortable(),
                Tables\Columns\TextColumn::make('price')->money('USD')->sortable(),
                Tables\Columns\TextColumn::make('difficulty')->badge(),
                Tables\Columns\IconColumn::make('is_featured')->boolean(),
                Tables\Columns\IconColumn::make('is_published')->boolean(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('difficulty')
                    ->options(['easy'=>'Easy','moderate'=>'Moderate','challenging'=>'Challenging']),
                Tables\Filters\TernaryFilter::make('is_published'),
            ])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListTours::route('/'),
            'create' => Pages\CreateTour::route('/create'),
            'edit'   => Pages\EditTour::route('/{record}/edit'),
        ];
    }
}
