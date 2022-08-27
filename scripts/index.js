// API de Clima.

const clima = document.getElementById("clima");

const url = "https://api.openweathermap.org/data/2.5/weather?q=Ushuaia&lang=es&appid=96790fa4cd0923dccc3d4a187479bf73&units=metric"

fetch(url)
    .then(res => res.json())
    .then(data => {
        ciudad = data.name;
        temp = data.main.temp;
        clima.innerText = `${ciudad} ${temp} ºC`
    })

//carga el carrito de compra del localstorage.

window.addEventListener("load", () => {

    if (localStorage.getItem("caritoDeCompra")) {
        const carritoLocalStorage = JSON.parse(localStorage.getItem("caritoDeCompra"));
        carritoLocalStorage.forEach(e => {
            let item = document.createElement("tr");
            item.innerHTML += `
                        <th scope="row">*</th>
                        <td>${e[0].codigo}</td>
                        <td>${e[0].descripcion}</td>
                        <td>${e[0].precio}</td>
                        <td>${e[0].cantidad}</td>
                        <td>${e[0].subTotaL}</td>
                 `;           
            let navBarItems = document.getElementById("nav-compra");
            navBarItems.append(item);
        })
    }

})

//Se genera tabla con productos de un JSON.

const productosJson = () => {
    fetch("data.json")
    .then(res => res.json())
    .then(data =>  { 
        renderizarProductos(data);
        localStorage.setItem("productosDeStock", JSON.stringify(data));   
    })

}

const renderizarProductos = (listas) => {
    const listaDeCompras = document.getElementById("listadocompraDom");
    for (const lista of listas) {
        listaDeCompras.innerHTML += `
        <div class="card" style="width: 18rem;">
          <div class="card-body"></div>
          <h5 class="card-title">Codigo: ${lista.codigo}</h5>
          <p class="card-text">Descripcion: ${lista.descripcion}</p>
          <p class="card-text">Precio: $${lista.precio}</p>
         </div>
        </div> `
    }
}

window.addEventListener("load", productosJson)

//

variablelocalStores = JSON.parse(localStorage.getItem("subTotalCompra")) || [];

//Se genera lista desplegable con los productos. 

const productos = JSON.parse(localStorage.getItem("productosDeStock"));

productos.forEach(e => {
    let opciones = document.createElement("option");
    opciones.innerText = e.codigo
    let selecionarProducto = document.getElementById("seleProductos")
    selecionarProducto.appendChild(opciones);
});


let productoSelecionado = document.getElementById("seleProductos");
productoSelecionado.addEventListener('change', handleBtnClick_Seleccionada);

function handleBtnClick_Seleccionada(e) {
    productoSelecionado = e.target.value;

}

//btn para seleccionar el codigo y cantidad.

let buttonSelecionar = document.getElementById('btnClick-Selecionar');

buttonSelecionar.addEventListener('click', handleBtnClick_Selecionar);


function handleBtnClick_Selecionar() {

    let inputTextSel = document.getElementById("seleccion-cantidad");
    let cant = inputTextSel.value;

    if (cant > 0) {

        const carritoDom = carrito(elementoCarrito(productoSelecionado),cant);

        carritoDomLocal.push(carritoDom);

        localStorage.setItem("caritoDeCompra", JSON.stringify(carritoDomLocal));

        //Crea lista de producto en el HTML.

        const elementos = carritoDom;

        let item = document.createElement("tr");
         for (const elemento of elementos) {
            item.innerHTML += `
                    <th scope="row">*</th>
                    <td>${elemento.codigo}</td>
                    <td>${elemento.descripcion}</td>
                    <td>${elemento.precio}</td>
                    <td>${elemento.cantidad}</td>
                    <td>${elemento.subTotaL}</td>
             `
        }

        let navBarItems = document.getElementById("nav-compra");
        navBarItems.append(item);

        Toastify({
            text: "Agregando Producto al carrito",
            duration: 2000,
            style: {
                background: "rgba(255, 0, 0, 0.397)"
            }

        }).showToast();


    } else {

        Swal.fire({
            title: 'Ingrese Cantidad de Producto',
            icon: 'error',
            confirmButtonText: 'OK'
        })

    }
  
};

//calcula el subTotal de la compra.

let butonCarrito = document.getElementById('btnClick-Selecionar');

butonCarrito.addEventListener('click', (e) => {

    let inputTextSel = document.getElementById("seleccion-cantidad");
    let cant = inputTextSel.value;

    const carritoPrecio = subTotalParcial(crearCompra(productoSelecionado), cant);

    carritocompras.push(carritoPrecio);


    butonCarrito = carritocompras.reduce((acumulador, elemento) => acumulador + elemento, 0);
    

    localStorage.setItem("subTotalCompra", JSON.stringify(butonCarrito));

    return butonCarrito;
    

});

//Limpiar formulario.

let limpiarForm = document.getElementById('btnClick-Selecionar');

buttonSelecionar.addEventListener('click', limpiarFormulario);

function limpiarFormulario() {

    document.getElementById("miForm").reset();
}

//boton de finalizar compra.

let finalizarCompra = document.getElementById('btnClick-Finalizar');

finalizarCompra.addEventListener('click', handleBtnClick_CarritoCompras)
 
function handleBtnClick_CarritoCompras() {

    butonCarrito > 0 ? finalizarCompra = suma(butonCarrito, variablelocalStores) : finalizarCompra = parseInt(localStorage.getItem("subTotalCompra")); 

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Gracias por Realizar su compra',
        icon: 'success',
        confirmButtonText: 'OK'
    })

}

//poka-yoke de calculo de cuotas.

let flagbtn = document.getElementById('btnClick-Finalizar');

flagbtn.addEventListener('click', handleBtnClick_flagFinalizar)

function handleBtnClick_flagFinalizar() {

    flagbtn = true;
}


//Selecciona cantidad de cuota de lista:

let cantidadCuotaS = document.getElementById('cantCuotas');
cantidadCuotaS.addEventListener('change', handleCuotaSeleccionada);

function handleCuotaSeleccionada(e) {

    cantidadCuotaS = parseInt( e.target.value);

}

//boton de Calculo:

let button = document.getElementById('btnClick');

button.addEventListener('click', handleBtnClick);

function handleBtnClick() {

    if (flagbtn == true) {

        let sumaParcial = finalizarCompra;

        let total = suma(sumaParcial, costoFinanciero(sumaParcial, cantidadCuotaS));

        let calCuotas = Math.round(div(total, cantidadCuotaS));

        let inputText = document.getElementById("subTotal-input");
        inputText.value = sumaParcial;

        let inputText2 = document.getElementById("total-input");
        inputText2.value = total;

        let inputCuotas = document.getElementById("cuota-input");
        inputCuotas.value = cantidadCuotaS;

        let inputCuotaImport = document.getElementById("cuotaImport-input");
        inputCuotaImport.value = calCuotas;

    }else{
        const swalWithBootstrapButtons2 = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
            },
            buttonsStyling: false
          })
    
          swalWithBootstrapButtons2.fire({
            title: 'Finalice primero la compra',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }

}

//boton de nueva compra.

let refresh = document.getElementById('refresh');
refresh.addEventListener('click', _ => {


    
    Swal.fire({
        title: 'Estas Seguro?',
        text: "Se eliminar los productos del Carrito de Compra!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Nueva compra!'
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
            localStorage.removeItem("caritoDeCompra");
            localStorage.removeItem("subTotalCompra");
        }
    })

})


