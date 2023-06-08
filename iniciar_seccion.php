<?php


use PIPE\Clases\PIPE;

require __DIR__.'/conexion.php';



if (isset($_POST['validar'])) {

    // $_SESSION["nombre_user"] = htmlentities($_POST["nombre_user"]);
    // // $_SESSION["contrasena"]= htmlentities($_POST["contrasena"]);

    // $username = $_SESSION["nombre_user"];
    // // $password = $_SESSION["contrasena"];


//********************POR SI EL ENCRYPTADOR NO FUNCIONDA***************************************** */
    $username = $_POST["nombre_user"];
    $password = $_POST["contrasena"];

    $consulta = PIPE::consulta(
        'seleccionar todo de Usuarios donde nombre_user = ?', [$username], PIPE::ARREGLO
    );

    if (is_array($consulta) && count($consulta) > 0) {
        $contra = $consulta[0]['contrasena'];
        $id_usuario = $consulta[0]['id'];
        if($password==$contra){
            $_SESSION['id'] = $id_usuario;
            $id =  $_SESSION['id'];

            $roles = PIPE::consulta(
                'seleccionar todo de role_usuario donde usuario_id = ?', [$id], PIPE::OBJETO
            );

            foreach ($roles as $roles) :
                $rol_ocultar = $roles->role_id;
                $_SESSION['role_id'] = $rol_ocultar ;
            endforeach;
            


            echo json_encode([
                'estado' => true,
                'mensaje' => 'Los datos ingresados son correctos'
            ]);
        } else {
            echo json_encode([
                'estado' => false,
                'mensaje' => 'Nombre de usuario o contraseña incorrectos'
            ]);
        }
    } else {
        echo json_encode([
            'estado' => false,
            'mensaje' => 'Nombre de usuario o contraseña incorrectos'
        ]);
    
        }
    }
//*********************************** */



//------------------------------------------------------------------------------
// $username = $_POST["nombre_user"];
// $password = $_POST["contrasena"];

// // echo $password;
//     $consulta = PIPE::consulta(
//         'seleccionar todo de Usuarios donde nombre_user = ?', [$username], PIPE::ARREGLO
//     );

//     // foreach ($consutla  as $value) {
//     //     // $value->donde(maruai();
//     // }

//     // $consulta = PIPE::tabla('usuarios')
//     //     ->donde('nombre_user', [$username])
//         //->obtener(PIPE::ARREGLO);

//     if (is_array($consulta) && count($consulta) > 0) {
//         $contrasena_encriptada = $consulta[0]['contrasena'];
//         $id_usuario = $consulta[0]['id'];

//         if (password_verify($password, $contrasena_encriptada)) {
//             $_SESSION['id'] = $id_usuario;
//             $id =  $_SESSION['id'];

//             $roles = PIPE::consulta(
//                 'seleccionar todo de role_usuario donde usuario_id = ?', [$id], PIPE::OBJETO
//             );

//             foreach ($roles as $roles) :
//                 $rol_ocultar = $roles->role_id;
//                 $_SESSION['role_id'] = $rol_ocultar ;
//             endforeach;
            


//             echo json_encode([
//                 'estado' => true,
//                 'mensaje' => 'Los datos ingresados son correctos'
//             ]);
//         } else {
//             echo json_encode([
//                 'estado' => false,
//                 'mensaje' => 'Nombre de usuario o contraseña incorrectos'
//             ]);
//         }
//     } else {
//         echo json_encode([
//             'estado' => false,
//             'mensaje' => 'Nombre de usuario o contraseña incorrectos'
//         ]);
//     }
// }
//----------------------------------------------------------------------------------

    // }

    // if (is_array($consulta) && count($consulta) > 0) {
    // $contrasena_encriptada = $consulta[0]['contrasena'];
    // // continuar con la verificación de la contraseña
    // // echo $contrasena_encriptada;
    // // echo $password;
    // if (password_verify($password, $contrasena_encriptada)) {
    //     echo json_encode([
    //         'estado' => true,
    //         'mensaje' => 'Los datos ingresados son correctos'
    //     ]);
    //     }else {
    //         // mostrar un mensaje de error
    //         echo json_encode([
    //             'estado' => false,
    //             'mensaje' => 'Nombre de usuario o contraseña incorrectos'
    //         ]);
    //         }
    

    // echo $username;

//     if ($resultado) {
//         if ($resultado->rowCount() > 0) {
//             echo json_encode([
//                 'estado' => true,
//                 'mensaje' => 'ok.',
//                 'datos' =>  $resultado
//             ]);
             
//         } else {
//             echo json_encode([
//                 'estado' => false,
//                 'mensaje' => 'Credenciales incorrectas.',
//                 'datos' =>  null
//             ]);
//         }
//     } else {
//         echo json_encode([
//             'estado' => false,
//             'mensaje' => 'Error en la consulta.',
//             'datos' =>  null
//         ]);
//     }
// }






//     echo json_encode(
//         [
//             'estado' => true,
//             'mensaje' => 'ok.',
//             'datos' =>  $resultado
//         ]
//     );

//     // echo $username;
// }else{
//     echo json_encode(
//         [
//             'estado' => false,
//             'mensaje' => 'Este error es por xy.',
//             'datos' =>  null
//         ]
//     );
 














//  $usuarios = PIPE::tabla('usuarios')
//  ->seleccionar('nombre_user', 'contrasena')
//  ->obtener(PIPE::OBJETO);

 
 //header('Content-Type: application/json');

    // echo json_encode($usuarios);


    //  foreach ($usuarios as $user) {
        // if($user->nombre_user== 'karen' && $user->contrasena = 123){
        //     echo 'Todo Good, Bienvenido!!';
        // }else{
        //     echo 'Acceso Denegado';
    
        // }
         
    //  } 


