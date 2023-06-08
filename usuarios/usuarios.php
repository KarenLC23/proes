<?php session_start() ?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="../CSS/styles_modulos.css">

</head>

<body>

    <nav class="navbar navbar-light bg-light">
        <form class="container-fluid justify-content-start">
            <button id="btn-perfil" class="btn btn-outline-success me-2" type="button">Perfil</button>
            <button id="btn-usuarios" class="btn btn-outline-success me-2" type="button">Usuarios</button>
            <button id="btn-facturas" class="btn btn-outline-success me-2" type="button">Facturas</button>
            <button id="btn-cerrar" class="btn btn-outline-success me-2" type="button">Cerrar Sección</button>
            <!-- <button class="btn btn-sm btn-outline-secondary" type="button">Smaller button</button> -->
        </form>
    </nav>


    <div class="contenedor">


    <div class="contenedor_tabla">

        <input type="search" id="search-input" placeholder="Escribe documento...y">
        <div id="tabla" class="centrar2">

            <!-- <input type="checkbox" class="btn-check" id="btn-check-2" checked autocomplete="off">
            <label class="btn btn-primary" for="btn-check-2">Checked</label> -->

            
            
        </div>

        
        <button type="button" id="crear" class="btn btn-primary ">Crear Usuario</button>
    </div>
   
        <div id="ver_usuario" class="informacion">
            
            <!-- <button type="button" id="editar" class="btn btn-secondary">Editar Perfil</button>
            <button type="button" id="guardar" class="btn btn-success">Guardar</button>
        -->
        
    </div>
</div>


   

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script src="../JS/usuarios.js" type="module"></script>

</body>

</html>