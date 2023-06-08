<?php session_start()?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="../CSS/styles.css">

</head>
<body>


<nav class="navbar navbar-light bg-light">
  <form class="container-fluid justify-content-start">

    <button id="btn-perfil" class="btn btn-outline-success me-2" type="button">Perfil</button>
    <?php if ($_SESSION['role_id'] != 2) { ?>
    <button id="btn-usuarios" class="btn btn-outline-success me-2" type="button">Usuarios</button>
    <?php } ?>
    <button id="btn-facturas" class="btn btn-outline-success me-2" type="button">Facturas</button>
    <button id="btn-cerrar" class="btn btn-outline-success me-2" type="button">Cerrar Sección</button>
    <!-- <button class="btn btn-sm btn-outline-secondary" type="button">Smaller button</button> -->
  </form>
</nav>


    <div id="perfil_user" class="perfil"></div>
 

    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script src='../JS/script_perfil.js'type="module"> </script>

</body>
</html>  


