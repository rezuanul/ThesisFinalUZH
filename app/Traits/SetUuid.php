<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait SetUuid
{
    protected static function bootSetUuid()
    {
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = Str::uuid();
            }
        });
    }

    public static function getUuid($uuid)
    {
        return self::where('uuid', $uuid)->first();
    }
}
