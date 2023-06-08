

<?php session_start() ?>




<div class="mb-3 perfil">



    <label for="nombre_usuario">Nombre de Usuario:</label>
    <input type="text" id="n_user" class="form-control">

    <label for="documento">Documento:</label>
    <input type="text" id="n_documento" class="form-control" required>

    <label for="nombre">Nombre Completo:</label>
    <input type="text" id="n_nombre" class="form-control">

    <label for="contrasena_perfil">Contraseña:</label>
    <input type="password" id="n_contrasena" class="form-control">

    <label for="correo">Correo:</label>
    <input type="text" id="n_correo" class="form-control">

    <label for="telefono">Teléfono:</label>
    <input type="text" id="n_telefono" class="form-control">

    <label for="">Roles:</label>

    <select id="n_rol" class="form-select form-select-sm" aria-label=".form-select-sm example">
        <!-- <option selected>Selecciona un rol</option> -->
        <option value="">Selecciona un rol</option>
        <option value="1">Administrador</option>
        <option value="2">Vendedor</option>
    </select>


</div>

<button type="button" id="n_guardar" class="btn btn-success">Guardar Usuario</button>