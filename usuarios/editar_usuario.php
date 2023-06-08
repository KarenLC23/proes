<?php
use PIPE\Clases\PIPE;

require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';

// $_SESSION["nombre_user"] = htmlentities($_POST["nombre_user"]);
// $username = $_SESSION["nombre_user"];
// $id = $_SESSION["id"];

// echo 'HOLA';
// echo $id;

// if (isset($_POST['guardar'])) {
//     $nombre_user = $_POST['nombre_user'];
//     $documento_usuario = $_POST['documento_usuario'];
//     echo $documento_usuario;
//     $nombre = $_POST['nombre'];
//     $correo = $_POST['correo'];
//     $telefono = $_POST['telefono'];
//     $rol = $_POST['rol'];
    
//     // Verificar si los datos han cambiado
//     $usuario_existente = PIPE::tabla('Usuarios')
//         ->donde('documento = ?', [$documento_usuario])
//         ->obtener();


//         foreach ($usuario_existente as $usuario_existente) :
//     if ($usuario_existente !== false) {
//         if ($usuario_existente->nombre_user == $nombre_user 
//             && $usuario_existente->documento == $documento_usuario
//             && $usuario_existente->nombre_completo == $nombre
//             && $usuario_existente->correo == $correo 
//             && $usuario_existente->telefono == $telefono
//             // && $usuario_existente->rol == $rol
//             ) {
//             // Los datos no han cambiado
//             echo "No se han realizado cambios";
//             return;
//         }
//     }
//     endforeach;

//     // Verificar si los nuevos datos ya existen en la base de datos
//     $usuario_existente = PIPE::tabla('Usuarios')
//         ->donde('documento = ? OR nombre_user = ? OR correo = ?', [$documento_usuario, $nombre_user, $correo])
//         ->obtener();

//         foreach ($usuario_existente as $usuario_existente) :
//     if ($usuario_existente !== false) {
//         if ($usuario_existente->documento === $documento_usuario) {
//             echo "El número de documento ya está registrado en la base de datos.";
//             return;
//         }
//         // if ($usuario_existente->correo === $correo) {
//         //     echo "El correo ya está registrado en la base de datos.";
//         //     return;
//         // }
//     }
// endforeach;
//     // Realizar la actualización si los datos son válidos
//     $resultado = PIPE::tabla('Usuarios')->donde('documento = ?', [$documento_usuario])
//     ->actualizar([ 
//         'nombre_user' => $nombre_user,
//         'documento' => $_POST['documento'],
//         'nombre_completo' => $_POST['nombre'],
//         'correo' => $correo,
//         'telefono' => $_POST['telefono']
//     ]);





// if (isset($_POST['guardar'])) {

//     $documento_usuario = $_POST['documento_usuario'];
//     $resultado = PIPE::tabla('Usuarios')->donde('documento = ?', [$documento_usuario])
//     ->actualizar([ 
//         'nombre_user' => $_POST['nombre_user'],
//         'documento' => $_POST['documento'],
//         'nombre_completo' => $_POST['nombre'],
//         // 'contrasena' => $_POST['contrasena'],
//         'correo' => $_POST['correo'],
//         'telefono' => $_POST['telefono']
//     ]);

//         // Obtener el ID del usuario insertado
//         $usuario = PIPE::consulta(
//             'seleccionar todo de Usuarios donde documento = ?', [$_POST['documento']], PIPE::ARREGLO
//         );
//         $usuario_id = $usuario[0]['id'];

//         // Insertar en la tabla de role_usuario usando el ID del usuario insertado
//         $role = PIPE::tabla('role_usuario')->donde('usuario_id = ?', [$usuario_id])
//         ->actualizar([ 
//             'role_id' => $_POST['rol']
//         ]);

// // // devolver una respuesta en formato JSON
// if( $usuario){
//     echo json_encode(['estado' => true]);
// }
// else {
//     echo json_encode(['estado' => false]);
// }
// }


if (isset($_POST['guardar'])) {

    $documento_usuario = $_POST['documento_usuario'];

    try {
        PIPE::tabla('Usuarios')->donde('documento = ?', [$documento_usuario])
            ->actualizar([ 
                'nombre_user' => $_POST['nombre_user'],
                'documento' => $_POST['documento'],
                'nombre_completo' => $_POST['nombre'],
                // 'contrasena' => $_POST['contrasena'],
                'correo' => $_POST['correo'],
                'telefono' => $_POST['telefono']
            ]);
        echo json_encode(['estado' => true] );
        // echo "Usuario actualizado correctamente.";
    
                    // Obtener el ID del usuario insertado
        $usuario = PIPE::consulta(
            'seleccionar todo de Usuarios donde documento = ?', [$_POST['documento']], PIPE::ARREGLO
        );
        $usuario_id = $usuario[0]['id'];

        // Insertar en la tabla de role_usuario usando el ID del usuario insertado
        $role = PIPE::tabla('role_usuario')->donde('usuario_id = ?', [$usuario_id])
        ->actualizar([ 
            'role_id' => $_POST['rol']
        ]);



    } catch (PDOException $e) {
        $errorCode = $e->getCode();
    
        // Si la excepción es por clave duplicada
        if ($errorCode == 23000) {
            $errorMessage = $e->getMessage();
            $duplicateIndex = strpos($errorMessage, "Duplicate entry '") + strlen("Duplicate entry '");
            $duplicateValue = substr($errorMessage, $duplicateIndex, strpos($errorMessage, "'", $duplicateIndex) - $duplicateIndex);
            
            // determinar qué campo está duplicado
            if (strpos($errorMessage, 'nombre_user') !== false) {
                $message = "El nombre de usuario '$duplicateValue' ya existe.";
            } else if (strpos($errorMessage, 'documento') !== false) {
                $message = "El numero de documento '$duplicateValue' ya existe.";
            } else if (strpos($errorMessage, 'correo') !== false) {
                $message = "El correo '$duplicateValue' ya existe.";
            } else {
                $message = "Un error desconocido ocurrió.";
            }
            echo json_encode(['estado' => false, 'mensaje' => $message]);
        } else {
            echo json_encode(['estado' => false, 'mensaje' => "Ocurrió un error al actualizar el usuario: " . $e->getMessage()]);
        }
    }




}



