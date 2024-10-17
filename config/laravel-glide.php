<?php

return [

    /*
     * The driver that will be used to create images. Can be set to gd or imagick.
     */
    'driver' => 'gd',

    /*
     * Glide will search for images in this directory
     *
     */
    'source' => [
        'path' => storage_path('app/public'),
    ],
];
