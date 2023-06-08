<?php
use Dompdf\Dompdf;

ob_start();




use PIPE\Clases\PIPE;

//  require __DIR__.'E:/Program Files/xampp/htdocs/PROES/conexion.php';
require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';
//  $num = $_SESSION['numero_f'];
// session_start();
// $num = $_GET["num"];
// $n = $_SESSION['numero_factura'];
// echo $num;

$num = $_GET['num'];

$facturas = PIPE::consulta(
    'seleccionar todo de Facturas donde numero_factura = ?', [$num], PIPE::OBJETO
);
// if($facturas){
//     echo json_encode(['estado' => true]);
// }
// else {
//     echo json_encode(['estado' => false]);
// }

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <!-- <link rel="stylesheet" href="../CSS/styles_modulos.css"> -->
</head>
<body>
    <?php echo $num ?>
    <p>--------------------------------------------------</p>
    
<?php foreach ($facturas as $facturas) : ?>
<div class="div2">
        <label for="">Nombre creador:</label>                        
        <input type="text" id="f_creada" class=" alto"  value='<?= $facturas->creada_por; ?>' >
    </div> 


<!-- <div class="mb-3 v_factura">   -->

  <div class="div1">
        <label for="" class="linea">Numero de Factura:</label>
        <input type="text" id="numero_factura" class=" alto" min="0"  value='<?= $facturas->numero_factura; ?>' >
    </div>
    <div class="div1">
        <label for="">Nombre del cliente:</label>
        <input type="text" id="nombre_c" class=" alto"  value='<?= $facturas->nombre_cliente; ?>' >
    </div>
    <div class="div1">
        <label for="">Documento Cliente:</label>
        <input type="text" id="documento_c" class=" alto" min="0"  value='<?= $facturas->documento_cliente; ?>' >
    </div>
    <div class="div1">
        <label for="">Telefono Cliente:</label>
        <input type="text" id="telefono_c" class=" alto" min="0"  value='<?= $facturas->telefono_cliente; ?>' >
    </div>
    <div class="div1">
        <label for="">Nombre Producto:</label>
        <input type="text" id="nombre_produc" class=" alto"  value='<?= $facturas->nombre_producto; ?>' >
    </div>
    <div class="div1">
        <label for="">Cantidad:</label>
        <input type="text" id="cantidad" class=" alto" min="0"  value='<?= $facturas->cantidad; ?>' >
    </div>
    <div class="div1">
        <label for="">Precio:</label>
        <input type="text" id="precio" class=" alto" min="0" step="any"  value='<?= $facturas->precio; ?>' >
    </div>
    <div class="div1">
        <label for="">Total:</label>
        <input type="text" id="total" class=" alto"  value='<?= $facturas->total; ?>' >
    </div> 

<!-- </div> -->
<?php endforeach; ?>


</body>
</html>


<?php

$html = ob_get_clean();
// echo $html;

// use Dompdf\Dompdf;
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once '../libreria/dompdf/autoload.inc.php';
$dompdf = new Dompdf();

$options = $dompdf->getOptions();
$options->set(array('isRemoteEnabled'=> true));
$dompdf->setOptions($options);

$dompdf->loadhtml($html);
// $dompdf->setPaper('A4', 'lamdscape');

$dompdf->setPaper('letter');
$dompdf->render();
$dompdf->stream("archivo_.php", array("Attachment" => false));
?>





