<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DestinationsResource\Pages;
use App\Filament\Resources\DestinationsResource\RelationManagers;
use App\Models\Destination;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Grid;
use Illuminate\Support\Str;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;

class DestinationsResource extends Resource
{
    protected static ?string $model = Destination::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

   public static function form(Form $form): Form
{
    return $form
        ->schema([
            Section::make('Basic Information')
                ->schema([
                    TextInput::make('title')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, callable $set) => 
                            $set('slug', Str::slug($state))
                        ),

                    TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true),

                    Select::make('category_id')
                        ->relationship('category', 'name')
                        ->required(),

                    Select::make('district_id')
                        ->relationship('district', 'name')
                        ->required(),
                ])
                ->columns(2),

            Section::make('Description')
                ->schema([
                    Textarea::make('summary')
                        ->rows(3),

                    RichEditor::make('description')
                        ->columnSpanFull(),
                ]),

            Section::make('Location')
                ->schema([
                    TextInput::make('latitude')
                        ->numeric(),

                    TextInput::make('longitude')
                        ->numeric(),
                ])
                ->columns(2),

            Section::make('Settings')
                ->schema([
                    TextInput::make('best_months')
                        ->placeholder('Dec, Jan, Feb'),

                    Toggle::make('is_featured'),

                    Toggle::make('is_published')
                        ->default(true),
                ])
                ->columns(3),
        ]);
}

  public static function table(Table $table): Table
{
    return $table
        ->columns([
            TextColumn::make('title')
                ->searchable(),

            TextColumn::make('category.name')
                ->label('Category'),

            TextColumn::make('district.name')
                ->label('District'),

            IconColumn::make('is_featured')
                ->boolean(),

            IconColumn::make('is_published')
                ->boolean(),
        ])
        ->actions([
            Tables\Actions\EditAction::make(),
        ]);
}

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDestinations::route('/'),
            'create' => Pages\CreateDestinations::route('/create'),
            'edit' => Pages\EditDestinations::route('/{record}/edit'),
        ];
    }
}
