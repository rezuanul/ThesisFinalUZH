<?php

namespace App\Services;

use GuzzleHttp\Client;

class Service
{
    protected $client;

    protected $service;

    public function __construct($url, $key, $service)
    {
        $array = [
            'base_uri' => $url,
            'verify' => false,
        ];

        $array['headers']['Accept'] = 'application/json';
        $array['headers']['Content-Type'] = 'application/json';
        if ($key) {
            if ($service === 'moralis' || $service === 'poap') {
                $array['headers']['X-API-Key'] = $key;
            } else {
                $array['headers']['Authorization'] = 'Bearer '.$key;
            }
        }

        $this->client = new Client($array);
        $this->service = $service;
    }

    public function get($path, $params = [])
    {
        return $this->makeRequest($path, $params);
    }

    public function post($path, $body, $params = [])
    {
        return $this->makeRequest($path, $params, 'POST', $body);
    }

    public function patch($path, $body, $params = [])
    {
        return $this->makeRequest($path, $params, 'PATCH', $body);
    }

    public function destroy($path)
    {
        return $this->makeRequest($path, [], 'DELETE');
    }

    public function makeRequest($path, $params, $method = 'GET', $body = null)
    {
        if ($this->service === 'moralis') {
            $path = '/api/v2'.$path;
        }

        $data = [];

        if(!empty($params)) {
            $params = http_build_query($params);
            $path .= '?'.$params;
        }

        if ($method == 'GET') {
            $response = $this->client->request($method, $path);
        } else {
            if (!empty($body['is_json'])) {
                unset($body['is_json']);
                $alteredBody = [
                    'body' => json_encode($body)
                ];
            } else {
                $alteredBody = [
                    'form_params' => $body
                ];
            }

            if ($this->service === 'paraswap' || $this->service === 'zigzag') {
                $alteredBody = [
                    'body' => $body
                ];
            }
            //dd($method, $path, $alteredBody);
            $response = $this->client->request($method, $path, $alteredBody);
        }

        if ($response->getStatusCode() === 200) {
            $body = $response->getBody()->getContents();
            $data = json_decode($body);
        }

        return $data;
    }
}