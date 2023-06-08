<?php

use PIPE\Clases\PIPE;

require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';

if (isset($_POST['guardar'])) {
    try {
    $resultado = PIPE::tabla('facturas')->insertar(
        [
            'numero_factura' => $_POST['numero_factura'],
            'nombre_cliente' => $_POST['nombre_c'],
            'documento_cliente' => $_POST['documento_c'],
            'telefono_cliente' => $_POST['telefono_c'],
            'nombre_producto' => $_POST['nombre_produc'],
            'cantidad' => $_POST['cantidad'],
            'precio' => $_POST['precio'],
            'total' => $_POST['total'],
            'creada_por' => $_POST['nombre_creador']
        ]);
        echo json_encode(['estado' => true] );
    // if ($resultado) {
    //     echo json_encode(['estado' => true]);
    // } else {
    //     echo json_encode(['estado' => false]);
    // }

} catch (PDOException $e) {
    $errorCode = $e->getCode();

    // Si la excepción es por clave duplicada
    if ($errorCode == 23000) {
        $errorMessage = $e->getMessage();
        $duplicateIndex = strpos($errorMessage, "Duplicate entry '") + strlen("Duplicate entry '");
        $duplicateValue = substr($errorMessage, $duplicateIndex, strpos($errorMessage, "'", $duplicateIndex) - $duplicateIndex);
        
        // determinar qué campo está duplicado
        if (strpos($errorMessage, 'numero_factura') !== false) {
            $message = "El numero de factura '$duplicateValue' ya existe.";
        } else {
            $message = "Un error desconocido ocurrió.";
        }
        echo json_encode(['estado' => false, 'mensaje' => $message]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => "Ocurrió un error al actualizar el usuario: " . $e->getMessage()]);
    }
}
}
