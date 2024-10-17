<?php

namespace App\Services\Moralis;

use App\Services\Service;
use Exception;

class TokenService extends Service
{
    public function __construct()
    {
        $url = config('vaccinedao.moralis.api_url');
        $key = config('vaccinedao.moralis.api_key');

        parent::__construct($url, $key, 'moralis');
    }

    public function checkBalance($address, $array)
    {
        return $this->get('/'.$address.'/erc20', $array);
    }

    public function checkNativeBalance($address, $array)
    {
        return $this->get('/'.$address.'/balance', $array);
    }

    public function checkNftOwners($contractAddress, $tokenId, $array)
    {
        return $this->get('/nft/'.$contractAddress.'/'.$tokenId.'/owners', $array);
    }

    public function getSpecificToken($contractAddress, $tokenId, $array = [])
    {
        return $this->get('/nft/'.$contractAddress.'/'.$tokenId, $array);
    }

    public function checkSpecificNft($address, $array)
    {
        return $this->get('/'.$address.'/nft', $array);
    }
}