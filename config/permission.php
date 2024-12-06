<?php

return [
    'table_names' => [
        'employees' => 'employees', 
    ],

    'column_names' => [
        'role_column' => 'role',    
    ],

    'cache' => [
        'expiration_time' => \DateInterval::createFromDateString('24 hours'),
        'key' => 'employee.permissions.cache',
        'store' => 'default',
    ],
];