<?php
use PIPE\Clases\PIPE;

require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';

$numero_factura = $_POST['numero_factura'];

if (isset($_POST['eliminar'])) {
    // Buscar el ID del usuario en la tabla role_usuario
    // $usuario = PIPE::consulta(
    //     'seleccionar id de usuarios donde documento = ?', [$documento], PIPE::ARREGLO
    // );
    // $usuario_id = $usuario[0]['id'];

    // Eliminar el registro de role_usuario correspondiente
    $factura = PIPE::tabla('Facturas')->donde('numero_factura = ?', [$numero_factura])->eliminar();

    // Eliminar el registro de Usuarios correspondiente
    // $resultado_usuario = PIPE::tabla('Usuarios')->donde('id = ?', [$usuario_id])->eliminar();

    // Devolver una respuesta en formato JSON
    if ($factura) {
        echo json_encode(['estado' => true]);
    } else {
        echo json_encode(['estado' => false]);
    }
}




