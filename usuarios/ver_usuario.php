<?php

use PIPE\Clases\PIPE;

//  require __DIR__.'E:/Program Files/xampp/htdocs/PROES/conexion.php';
require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';

// session_start();
// $username = $_SESSION["nombre_user"];
$doc = $_GET["doc"];
// echo $doc;

$usuario = PIPE::consulta(
    'seleccionar id de Usuarios donde documento = ?', [$doc], PIPE::OBJETO
);

if ($usuario) {
    
    foreach ($usuario as $usuario) :
    $id = $usuario->id;
        endforeach;

    $usuarios = PIPE::consulta(
        'seleccionar todo de Usuarios donde id = ?', [$id], PIPE::OBJETO
    );

    $roles = PIPE::consulta(
        'seleccionar todo de role_usuario donde usuario_id = ?', [$id], PIPE::OBJETO
    );




} else {
    // Si no se encuentra ningún usuario con ese número de documento, mostrar un mensaje de error o redirigir a otra página
    echo "No se encontró ningún usuario con ese número de documento";
}


?>




<div>
    <div class="mb-3 perfil">




        <?php foreach ($usuarios as $usuarios) : ?>
            
<label for="nombre_usuario">Nombre de Usuario:</label>
<input type="text" id="user" class="form-control" disabled data-habilitar value='<?= $usuarios->nombre_user; ?>' > 


<label for="documento">Documento:</label>
<input type="text" id="d" class="form-control" disabled data-habilitar value='<?= $usuarios->documento; ?>' > 

<label for="nombre">Nombre Completo:</label>
<input type="text" id="n" class="form-control" disabled data-habilitar value='<?= $usuarios->nombre_completo; ?>'>


<label for="correo">Correo:</label>
<input type="text" id="correo" class="form-control" data-habilitar disabled value='<?= $usuarios->correo; ?>'>

<label for="telefono">Teléfono:</label>
<input type="text" id="telefono" class="form-control" data-habilitar disabled value='<?= $usuarios->telefono; ?>'>


<?php endforeach; ?>

<?php foreach ($roles as $roles) : ?>

<label for="">Roles:</label>
<select id="roles" class="form-select form-select-sm" aria-label=".form-select-sm example" data-habilitar disabled>
  <option value="">Selecciona un rol</option>
  <option value="1" <?php if ($roles->role_id == 1) echo "selected"; ?>>Administrador</option>
  <option value="2" <?php if ($roles->role_id == 2) echo "selected"; ?>>Vendedor</option>
</select>


<?php endforeach; ?>

    </div>
    <button type="button" id="editar_user" class="btn btn-secondary">Editar Perfil</button>
    <button type="button" id="guardar_user" class="btn btn-success">Guardar</button>
    <button type="button" id="eliminar_user" class="btn btn-danger">Eliminar</button>


</div>