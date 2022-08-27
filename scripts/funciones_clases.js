const suma = (a, b) => {
    return parseInt (a + b)
};
const div = (a, b) => {
    return a / b
};
const mult = (a, b) => {
    return a * b
};

function elementoCarrito(codigoProducto) {
    const elemento = productos.find(producto => producto.codigo == codigoProducto)
    return elemento
};

function carrito(acc, cant) {

    const acc2 = [acc];

    const productocarrito = acc2.map((elemento) => {
        return {
            codigo: elemento.codigo,
            descripcion: elemento.descripcion,
            precio: parseInt(elemento.precio),
            cantidad: parseInt(cant),
            subTotaL: mult(elemento.precio, cant),
        }
    })
    return productocarrito;

};

function crearCompra(codigoProducto) {
    const elemento = productos.find(producto => producto.codigo == codigoProducto)
    return {
        subTotal: elemento.precio
    }
};

function subTotalParcial(acc, cant) {
    let elemento = mult(acc.subTotal, cant);
    return elemento;
};

function costoFinanciero(sumaP, cuotas) {

    let costoFinancieroT = 0;

    switch (cuotas) {
        
        case 1:
            costoFinancieroT = 0;
            break;
        case 3:
            costoFinancieroT = sumaP * 0.15;
            break;
        case 6:
            costoFinancieroT = sumaP * 0.30;
            break;
        case 9:
            costoFinancieroT = sumaP * 0.50;
            break;
        case 12:
            costoFinancieroT = sumaP * 0.75;
            break;
        default:
              swal.fire({
                title: 'Ingrese Cantidad de Cuotas',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            break;
    }
    return costoFinancieroT;
}

const carritocompras = [];
const carritoDomLocal = [];
