<?php

namespace App\Providers;

use App\Models\EducationProvider;
use App\Models\Location;
use App\Models\MailTemplate;
use App\Models\User;
use App\Policies\EducationProviderPolicy;
use App\Policies\LocationPolicy;
use App\Policies\MailTemplatePolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
        EducationProvider::class => EducationProviderPolicy::class,
        Location::class => LocationPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
