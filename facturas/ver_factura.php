<?php

use PIPE\Clases\PIPE;

//  require __DIR__.'E:/Program Files/xampp/htdocs/PROES/conexion.php';
require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';

// session_start();
// $username = $_SESSION["nombre_user"];
$num = $_GET["num"];
$_SESSION['numero_f']= $num;
// echo $doc;

$factura = PIPE::consulta(
    'seleccionar id de Facturas donde numero_factura = ?', [$num], PIPE::OBJETO
);

if ($factura) {
    
    foreach ($factura as $factura) :
    $id = $factura->id;
        endforeach;

    $facturas = PIPE::consulta(
        'seleccionar todo de Facturas donde id = ?', [$id], PIPE::OBJETO
    );

    // foreach ($facturas as $factura) {
    //     echo '---------',  $factura->creada_por;
    // }

} else {
    // Si no se encuentra ningún usuario con ese número de documento, mostrar un mensaje de error o redirigir a otra página
    echo "No se encontró ninguna factura con ese número de factura";
}



?>

<?php foreach ($facturas as $facturas) : ?>

<div class="div2">
        <label for="">Nombre creador:</label>                        
        <input type="text" id="f_creada" class="form-control alto" disabled value='<?= $facturas->creada_por; ?>' >
    </div> 


<div class="mb-3 v_factura">  



  <div class="div1">
        <label for="" class="linea">Numero de Factura:</label>
        <input type="number" id="numero_factura" class="form-control alto" min="0" disabled value='<?= $facturas->numero_factura; ?>' >
    </div>
    <div class="div1">
        <label for="">Nombre del cliente:</label>
        <input type="text" id="nombre_c" class="form-control alto" disabled value='<?= $facturas->nombre_cliente; ?>' >
    </div>
    <div class="div1">
        <label for="">Documento Cliente:</label>
        <input type="text" id="documento_c" class="form-control alto" min="0" disabled value='<?= $facturas->documento_cliente; ?>' >
    </div>
    <div class="div1">
        <label for="">Telefono Cliente:</label>
        <input type="tel" id="telefono_c" class="form-control alto" min="0" disabled value='<?= $facturas->telefono_cliente; ?>' >
    </div>
    <div class="div1">
        <label for="">Nombre Producto:</label>
        <input type="text" id="nombre_produc" class="form-control alto" disabled value='<?= $facturas->nombre_producto; ?>' >
    </div>
    <div class="div1">
        <label for="">Cantidad:</label>
        <input type="number" id="cantidad" class="form-control alto" min="0" disabled value='<?= $facturas->cantidad; ?>' >
    </div>
    <div class="div1">
        <label for="">Precio:</label>
        <input type="number" id="precio" class="form-control alto" min="0" step="any" disabled value='<?= $facturas->precio; ?>' >
    </div>
    <div class="div1">
        <label for="">Total:</label>
        <input type="number" id="total" class="form-control alto" disabled value='<?= $facturas->total; ?>' >
    </div> 


</div>
<?php endforeach; ?>