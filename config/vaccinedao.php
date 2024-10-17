<?php

return [
    'moralis' => [
        'api_url' => env('MORALIS_API_URL'),
        'api_key' => env('MORALIS_API_KEY'),
        'node' => env('MORALIS_NODE'),
        'polygon_node' => env('MORALIS_NODE_POLYGON')
    ],
    'wallet_connect' => [
        'project_id' => env('WALLET_CONNECT_PROJECTID')
    ],
    'chain_id' => env('CHAIN_ID'),
    'contracts' => [
        '80002' => [
            'users_records' => env('USERS_RECORD_DAO'),
            'erc20' => env('ERC20_TOKEN'),
            'proposal' => env('PROPOSAL_CONTRACT'),
        ],
        '137' => [
            'users_records' => env('USERS_RECORD_DAO'),
            'erc20' => env('ERC20_TOKEN'),
            'proposal' => env('PROPOSAL_CONTRACT'),
        ]
    ],
];