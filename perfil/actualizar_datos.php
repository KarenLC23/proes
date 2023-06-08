<?php
use PIPE\Clases\PIPE;

require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';

// $_SESSION["nombre_user"] = htmlentities($_POST["nombre_user"]);
// $username = $_SESSION["nombre_user"];
$id = $_SESSION["id"];

// echo $username;

if (isset($_POST['guardar'])) {

    $password= $_POST['contrasena'];
    $contrasena_encriptada = password_hash($password, PASSWORD_DEFAULT);

    try {
    $resultado = PIPE::tabla('Usuarios')->donde('id = ?', [$id])
    ->actualizar([ 
                'nombre_user' => $_POST['nombre_user'],
                'documento' => $_POST['documento'],
                'nombre_completo' => $_POST['nombre_completo'],
                'contrasena' =>  $contrasena_encriptada,
                'correo' => $_POST['correo'],
                'telefono' => $_POST['telefono']
            ]);


            $role = PIPE::tabla('role_usuario')->donde('usuario_id = ?', [$id])
            ->actualizar([ 
                'role_id' => $_POST['rol']
            ]);
            echo json_encode(['estado' => true] );



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
    // devolver una respuesta en formato JSON
    // if(($resultado && $role) || $resultado){

    //             echo json_encode(['estado' => true]);
    //         }
    //         else {
    //             echo json_encode(['estado' => false,
                
    //             ]);
    //         }
        }