<?php

use PIPE\Clases\PIPE;

require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';


if (isset($_POST['guardar'])) {
    // Comenzar la transacción

    $password = $_POST["contrasena"];
    $contrasena_encriptada = password_hash($password, PASSWORD_DEFAULT);
   
        // Insertar en la tabla de Usuarios y obtener el ID de la última inserción
        try {
        $usuario_insertado = PIPE::tabla('Usuarios')->insertar([
            'documento' => $_POST['documento'],
            'nombre_user' => $_POST['nombre_user'],
            'nombre_completo' => $_POST['nombre_completo'],
            'contrasena' => $contrasena_encriptada,
            'correo' => $_POST['correo'],
            'telefono' => $_POST['telefono']
        ]);

        // Obtener el ID del usuario insertado
        $usuario = PIPE::consulta(
            'seleccionar todo de Usuarios donde documento = ?', [$_POST['documento']], PIPE::ARREGLO
        );
        $usuario_id = $usuario[0]['id'];

        // Insertar en la tabla de role_usuario usando el ID del usuario insertado
        $role = PIPE::tabla('role_usuario')->insertar([
            'role_id' => $_POST['rol'],
            'usuario_id' => $usuario_id
        ]);
        echo json_encode(['estado' => true] );

        
        // echo 'USUARIOS====', $usuario;
        // if($usuario && $role){
        //     echo json_encode(['estado' => true]);
        // }else{
        //     echo json_encode(['estado' => false]);

        // }
        
        // $resultado = PIPE::tabla('usuarios')->donde('id = ?', [$usuario_id])->eliminar();
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