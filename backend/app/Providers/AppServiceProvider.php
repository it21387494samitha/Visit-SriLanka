<?php

namespace App\Providers;

use Illuminate\Foundation\Console\ServeCommand;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Fix: Laravel's passthrough list uses uppercase (SYSTEMROOT, PATH) but
        // Windows/PHP $_ENV has mixed-case keys (SystemRoot, Path). Since
        // in_array() is case-sensitive, the critical vars get stripped from the
        // PHP dev server subprocess, breaking socket binding.
        ServeCommand::$passthroughVariables = array_merge(ServeCommand::$passthroughVariables, [
            'SystemRoot',
            'SystemDrive',
            'windir',
            'Path',
            'TEMP',
            'TMP',
            'PATHEXT',
            'LOCALAPPDATA',
            'USERPROFILE',
            'COMPUTERNAME',
            'ComSpec',
        ]);
    }
}
