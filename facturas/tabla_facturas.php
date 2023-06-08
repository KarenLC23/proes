<?php

use PIPE\Clases\PIPE;

require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';

$facturas = PIPE::tabla('facturas')
    ->ordenarPor('id', 'desc')
    ->obtener(PIPE::OBJETO);

?>


<table class="table table-hover">
    <thead>

        <tr>
            <th>N° Factura</th> 
            <th>Nombre Cliente</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Imprimir</th>
            <?php if ($_SESSION['role_id'] != 2) { ?>
            <th>Editar</th>
            <th>Eliminar</th>
            <?php } ?>
        </tr>

    </thead>

    <tbody>
        
        <?php foreach ($facturas as $facturas) : ?>
        <tr>
                <td id="nf" class="selec"><?=$facturas->numero_factura; ?></td> 
                <td id="nc" class="selec" ><?=$facturas->nombre_cliente; ?></td>           
                <td id="np" class="selec" ><?=$facturas->nombre_producto; ?></td>           
                <td id="can" class="selec" ><?=$facturas->cantidad; ?></td>           
                <td id="pre" class="selec" ><?=$facturas->precio; ?></td>           
                <td id="tot" class="selec" ><?=$facturas->total; ?></td>           
                <td id="imp" class="selec" ><button id="imprimir" class="sel">impr</button></td>
                <?php if ($_SESSION['role_id'] != 2) { ?>           
                <td id="edi" class="selec" ><button id="editar" class="sel">Edi</button></td>           
                <td id="eli" class="selec" ><button id="eliminar" class="sel">X</button></td>           
                <?php } ?>
    
        </tr>
        <?php endforeach; ?>

        <tbody>
            
</table>
