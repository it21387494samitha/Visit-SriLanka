<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DestinationResource\Pages;
use App\Models\Destination;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class DestinationResource extends Resource
{
    protected static ?string $model = Destination::class;
    protected static ?string $navigationIcon = 'heroicon-o-map-pin';
    protected static ?string $navigationGroup = 'Tourism';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Tabs::make('Destination')->tabs([

                Forms\Components\Tabs\Tab::make('General')->schema([
                    Forms\Components\TextInput::make('name')
                        ->required()->maxLength(255)->live(onBlur: true),
                    Forms\Components\TextInput::make('slug')
                        ->required()->unique(ignoreRecord: true)->maxLength(255),
                    Forms\Components\Select::make('category_id')
                        ->relationship('category', 'name')->required(),
                    Forms\Components\Select::make('province')
                        ->options([
                            'Western'     => 'Western',
                            'Central'     => 'Central',
                            'Southern'    => 'Southern',
                            'Northern'    => 'Northern',
                            'Eastern'     => 'Eastern',
                            'North Western'=> 'North Western',
                            'North Central'=> 'North Central',
                            'Uva'         => 'Uva',
                            'Sabaragamuwa'=> 'Sabaragamuwa',
                        ])->required(),
                    Forms\Components\TextInput::make('district')->maxLength(100),
                    Forms\Components\RichEditor::make('description')->columnSpanFull(),
                    Forms\Components\Textarea::make('short_description')->rows(3)->columnSpanFull(),
                ]),

                Forms\Components\Tabs\Tab::make('Location')->schema([
                    Forms\Components\TextInput::make('latitude')->numeric(),
                    Forms\Components\TextInput::make('longitude')->numeric(),
                    Forms\Components\TextInput::make('best_time_to_visit')->helperText('Comma-separated months'),
                    Forms\Components\TextInput::make('climate')->maxLength(100),
                    Forms\Components\TextInput::make('entry_fee')->numeric()->prefix('LKR'),
                ]),

                Forms\Components\Tabs\Tab::make('SEO')->schema([
                    Forms\Components\TextInput::make('meta_title')->maxLength(70),
                    Forms\Components\Textarea::make('meta_description')->rows(3)->maxLength(160),
                ]),

                Forms\Components\Tabs\Tab::make('Publish')->schema([
                    Forms\Components\Toggle::make('is_featured')->label('Featured'),
                    Forms\Components\Toggle::make('is_published')->label('Published'),
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
                Tables\Columns\TextColumn::make('category.name')->badge(),
                Tables\Columns\TextColumn::make('province'),
                Tables\Columns\IconColumn::make('is_featured')->boolean()->label('Featured'),
                Tables\Columns\IconColumn::make('is_published')->boolean()->label('Published'),
                Tables\Columns\TextColumn::make('updated_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')->relationship('category', 'name'),
                Tables\Filters\TernaryFilter::make('is_published')->label('Published'),
                Tables\Filters\TernaryFilter::make('is_featured')->label('Featured'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListDestinations::route('/'),
            'create' => Pages\CreateDestination::route('/create'),
            'edit'   => Pages\EditDestination::route('/{record}/edit'),
        ];
    }
}
