<?php
// session_start();

use PIPE\Clases\PIPE;

require $_SERVER['DOCUMENT_ROOT'] . '/PROES/conexion.php';

$id = $_SESSION["id"];

$usuarios = PIPE::consulta(
    'seleccionar nombre_completo de Usuarios donde id = ?',
    [$id],
    PIPE::OBJETO
);

?>

<div class="div2">
        <label for="">Nombre creador:</label>
        <input type="text" id="nombre_creador" class="form-control alto" value="<?php foreach ($usuarios as $usuario) :
                                                                                    echo $usuario->nombre_completo;
                                                                                endforeach; ?>" disabled>
    </div>

<div class="mb-3 v_factura">
    <div class="div1">
        <label for="" class="linea">Numero de Factura:</label>
        <input type="number" id="numero_factura" class="form-control alto" min="0">
    </div>
    <div class="div1">
        <label for="">Nombre del cliente:</label>
        <input type="text" id="nombre_c" class="form-control alto">
    </div>
    <div class="div1">
        <label for="">Documento Cliente:</label>
        <input type="text" id="documento_c" class="form-control alto" min="0">
    </div>
    <div class="div1">
        <label for="">Telefono Cliente:</label>
        <input type="tel" id="telefono_c" class="form-control alto" min="0">
    </div>
    <div class="div1">
        <label for="">Nombre Producto:</label>
        <input type="text" id="nombre_produc" class="form-control alto">
    </div>
    <div class="div1">
        <label for="">Cantidad:</label>
        <input type="number" id="cantidad" class="form-control alto" min="0">
    </div>
    <div class="div1">
        <label for="">Precio:</label>
        <input type="number" id="precio" class="form-control alto" min="0" step="any">
    </div>
    <div class="div1">
        <label for="">Total:</label>
        <input type="number" id="total" class="form-control alto" disabled>
    </div>

</div>

<button type="button" id="generar_factura" class="btn btn-secondary">GENERAR</button>