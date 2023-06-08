<?php

use PIPE\Clases\PIPE;

require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';

$usuarios = PIPE::tabla('usuarios')
    ->ordenarPor('id')
    ->obtener(PIPE::OBJETO);

?>
        <table class="table table-hover table-borderless">

    <thead>

        <tr>
            <th>Documento</th> 
            <th>Nombre</th>
        </tr>

    </thead>
    <?php foreach ($usuarios as $usuarios) : ?>
    <tbody>
    
        <tr>
                <td id="documento" class="selec"><?=$usuarios->documento; ?></td> 
                <td id="nombre" class="selec" ><?=$usuarios->nombre_completo; ?></td>           

        </tr>
        <?php endforeach; ?>
        <tbody>
            
</table>