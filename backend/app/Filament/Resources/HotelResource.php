<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HotelResource\Pages;
use App\Models\Hotel;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class HotelResource extends Resource
{
    protected static ?string $model = Hotel::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    protected static ?string $navigationGroup = 'Tourism';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Tabs::make('Hotel')->tabs([

                Forms\Components\Tabs\Tab::make('General')->schema([
                    Forms\Components\TextInput::make('name')->required()->maxLength(255),
                    Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
                    Forms\Components\Textarea::make('short_description')->rows(3)->columnSpanFull(),
                    Forms\Components\RichEditor::make('description')->columnSpanFull(),
                ]),

                Forms\Components\Tabs\Tab::make('Details')->schema([
                    Forms\Components\Select::make('province')
                        ->options([
                            'Western' => 'Western', 'Central' => 'Central',
                            'Southern' => 'Southern', 'Northern' => 'Northern',
                            'Eastern' => 'Eastern', 'North Western' => 'North Western',
                            'North Central' => 'North Central', 'Uva' => 'Uva',
                            'Sabaragamuwa' => 'Sabaragamuwa',
                        ]),
                    Forms\Components\TextInput::make('district'),
                    Forms\Components\TextInput::make('address')->columnSpanFull(),
                    Forms\Components\TextInput::make('latitude')->numeric(),
                    Forms\Components\TextInput::make('longitude')->numeric(),
                    Forms\Components\Select::make('star_rating')
                        ->options([1=>'★',2=>'★★',3=>'★★★',4=>'★★★★',5=>'★★★★★']),
                    Forms\Components\TextInput::make('price_per_night')->numeric()->prefix('LKR'),
                    Forms\Components\TagsInput::make('amenities'),
                    Forms\Components\TextInput::make('contact_email')->email(),
                    Forms\Components\TextInput::make('contact_phone'),
                    Forms\Components\TextInput::make('website')->url(),
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
                Tables\Columns\ImageColumn::make('hero')->circular(),
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('province'),
                Tables\Columns\TextColumn::make('star_rating')->sortable(),
                Tables\Columns\TextColumn::make('price_per_night')->money('LKR')->sortable(),
                Tables\Columns\IconColumn::make('is_featured')->boolean(),
                Tables\Columns\IconColumn::make('is_published')->boolean(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('province'),
                Tables\Filters\TernaryFilter::make('is_published'),
            ])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListHotels::route('/'),
            'create' => Pages\CreateHotel::route('/create'),
            'edit'   => Pages\EditHotel::route('/{record}/edit'),
        ];
    }
}
