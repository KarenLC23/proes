<?php

use PIPE\Clases\PIPE;

    //  require __DIR__.'E:/Program Files/xampp/htdocs/PROES/conexion.php';
    require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';
    
    // session_start();
    // $username = $_SESSION["nombre_user"];
    $id = $_SESSION["id"];
    // echo $id;

    $usuarios = PIPE::consulta(
        'seleccionar todo de Usuarios donde id = ?', [$id], PIPE::OBJETO
    );



    $roles = PIPE::consulta(
        'seleccionar todo de role_usuario donde usuario_id = ?', [$id], PIPE::OBJETO
    );
 ?>


<div>



<div class="mb-3 perfil">




<?php foreach ($usuarios as $usuarios) : ?>
<label for="user">Nombre de Usuario:</label>
<input type="text" id="user" class="form-control" disabled data-habilitar value='<?=$usuarios->nombre_user; ?>' > 


<label for="documento">Documento:</label>
<input type="text" id="documento" class="form-control" disabled data-habilitar value='<?=$usuarios->documento; ?>' > 

<label for="nombre">Nombre Completo:</label>
<input type="text" id="nombre" class="form-control" disabled data-habilitar value='<?=$usuarios->nombre_completo; ?>'>

<label for="contrasena">Contraseña:</label>
<input type="password" id="contrasena" class="form-control" data-habilitar disabled value='****'>

<label for="correo">Correo:</label>
<input type="text" id="correo" class="form-control" data-habilitar disabled value='<?=$usuarios->correo; ?>'>

<label for="telefono">Teléfono:</label>
<input type="text" id="telefono" class="form-control" data-habilitar disabled value='<?=$usuarios->telefono; ?>'>

<?php endforeach; ?>

<?php foreach ($roles as $roles) : ?>

<label for="roles_seccion">Roles:</label>
<select id="roles_seccion" class="form-select form-select-sm" aria-label=".form-select-sm example" data-habilitar disabled>
  <option value="">Selecciona un rol</option>
  <option value="1" <?php if ($roles->role_id == 1) echo "selected"; ?>>Administrador</option>
  <option value="2" <?php if ($roles->role_id == 2) echo "selected"; ?>>Vendedor</option>
</select>

 
<?php endforeach; ?>

</div>
<button type="button" id="editar" class="btn btn-secondary">Editar Perfil</button>
<button type="button" id="guardar" class="btn btn-success">Guardar</button>
    
      
</div>