<?php
use PIPE\Clases\PIPE;

require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';

// $_SESSION["nombre_user"] = htmlentities($_POST["nombre_user"]);
// $username = $_SESSION["nombre_user"];
// $id = $_SESSION["id"];

// echo 'HOLA';
// echo $id;

if (isset($_POST['guardar'])) {
    try {
    $numero_factura_original = $_POST['numero_factura_original'];
    $numero_factura = $_POST['numero_factura'];

        // $facturaId = PIPE::consulta(
        //     'seleccionar todo de Facturas donde numero_factura = ?', [$_POST['numero_factura']], PIPE::ARREGLO
        // );
        //  $factura_id = $facturaId[0]['id'];

        //  echo $factura_id ;

        $factura = PIPE::tabla('Facturas')->donde('numero_factura = ?', [$numero_factura_original])
        ->actualizar([ 
        'numero_factura' => $_POST['numero_factura'],
        'nombre_cliente' => $_POST['nombre_c'],
        'documento_cliente' => $_POST['documento_c'],
        'telefono_cliente' => $_POST['telefono_c'],
        'nombre_producto' => $_POST['nombre_produc'],
        'cantidad' => $_POST['cantidad'],
        'precio' => $_POST['precio'],
        'total' => $_POST['total']
    ]);
    echo json_encode(['estado' => true] );

    // echo $factura_id ;
    // devolver una respuesta en formato JSON
    // if($factura){
    //     echo json_encode(['estado' => true]);
    // }
    // else {
    //     echo json_encode(['estado' => false]);
    // }
}catch (PDOException $e) {
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

// Obtener el ID del usuario insertado
// $factura = PIPE::consulta(
//     'seleccionar todo de Factura donde numero_factura = ?', [$_POST['numero_factura']], PIPE::ARREGLO
// );
// $factura_id = $factura[0]['id'];

// // Insertar en la tabla de role_usuario usando el ID del usuario insertado
// $role = PIPE::tabla('role_usuario')->donde('usuario_id = ?', [$usuario_id])
// ->actualizar([ 
//     'role_id' => $_POST['rol']
// ]);