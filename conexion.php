<?php
session_start();
require_once __DIR__.'/pipe-5.1.0/src/PIPE/inicializador.php';

use PIPE\Clases\PIPE;
use PIPE\Clases\Configuracion;

Configuracion::inicializar(
    [
        'BD_CONTROLADOR' => 'mysql',
        'BD_HOST' => 'localhost',
        'BD_PUERTO' => '3306',
        'BD_USUARIO' => 'root',
        'BD_CONTRASENA' => '',
        'BD_BASEDATOS' => 'proyecproes',
        'IDIOMA' => 'es',
        // 'RUTA_MODELOS' => 'ruta/completa/a/mis/modelos',
        'ZONA_HORARIA' => 'America/Bogota',
        'COMANDO_INICIAL' => 'set names utf8mb4 collate utf8mb4_unicode_ci',
        'TIPO_RETORNO' => Configuracion::CLASE,
        'OPCIONES' => [PDO::MYSQL_ATTR_LOCAL_INFILE => 1]
    ]
);
// echo PIPE::VERSION;


/**
 * Finalmente, verificamos que hemos inicializado la configuración correctamente
 * imprimiendo la versión del ORM PIPE.
 */