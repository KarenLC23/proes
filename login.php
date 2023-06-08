<!-- <?php   session_start(); ?> -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyecto Proes</title>
    <link rel="stylesheet" href="CSS/styles.css">
</head>
<body>
    <section class="login">
        <div class="img-logo">
            <img src="Acces/proes-logo.png" alt="Logo Proes">
        </div>

        <div class="user-pasword">
           
                    <label for="nombre-usuario">Nombre Usuario</label>  
                    <input type="text" id="nombre-usuario" required>
                
                
                    <label for="contrasena">Contraseña</label>  
                    <input type="password" id="contrasena" required>
                    
                   <button  id="iniciar" class="bt-iniciar">Iniciar Seccion</button>
        
        </div>

            <div id="prueba"></div>

    </section>

    <script src="JS/script.js" type="module"></script>
</body>
</html>