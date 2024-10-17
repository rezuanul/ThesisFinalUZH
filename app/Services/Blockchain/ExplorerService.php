<?php

namespace App\Services\Blockchain;

use App\Services\Service;

class ExplorerService extends Service
{
    protected $key;

    public function __construct($chain)
    {
        $config = config('vaccinedao.blockchain');
        $url = $config[$chain]['url'];
        $this->key = $config[$chain]['key'];

        parent::__construct($url, '', 'blockchain');
    }

    public function getBalance($body)
    {
        $body['apikey'] = $this->key;
        return $this->get('/api', $body);
    }
}