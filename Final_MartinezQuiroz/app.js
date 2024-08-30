document.addEventListener('DOMContentLoaded', () => {
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block';

    const autos = [
        { nombre: 'Toyota Camry', precio: 24000 },
        { nombre: 'Honda Accord', precio: 26000 },
        { nombre: 'Ford Mustang', precio: 35000 },
        { nombre: 'Chevrolet Camaro', precio: 37000 },
        { nombre: 'BMW Serie 3', precio: 41000 },
        { nombre: 'Audi A4', precio: 42000 },
        { nombre: 'Mercedes-Benz Clase C', precio: 43000 },
        { nombre: 'Tesla Model 3', precio: 45000 },
        { nombre: 'Lexus IS', precio: 39000 },
        { nombre: 'Nissan Altima', precio: 23000 }
    ];

    localStorage.setItem('autos', JSON.stringify(autos));

    const selectAuto = document.getElementById('car');
    
    autos.map((auto, index) => {
        const opcion = document.createElement('option');
        opcion.value = index;
        opcion.textContent = `${auto.nombre} - $${auto.precio}`;
        selectAuto.appendChild(opcion);
    });

    loadingElement.style.display = 'none';

    document.getElementById('calculateButton').addEventListener('click', calcularPagoMensual);
});

async function calcularPagoMensual() {
    const autos = JSON.parse(localStorage.getItem('autos'));

    const selectAuto = document.getElementById('car');
    const indiceAutoSeleccionado = selectAuto.value;
    const autoSeleccionado = autos[indiceAutoSeleccionado];

    let pagoInicial = parseFloat(document.getElementById('downPayment').value);
    const nombre = document.getElementById('name').value;

    if (isNaN(pagoInicial) || pagoInicial < 0) {
        return Swal.fire('Error', 'Por favor ingresa una cantidad válida para el pago inicial.', 'error');
    }

    const pagoInicialMinimo = 0.1 * autoSeleccionado.precio;
    while (pagoInicial < pagoInicialMinimo) {
        const { value: nuevoPagoInicial } = await Swal.fire({
            title: 'Pago inicial insuficiente',
            text: `El pago inicial debe ser al menos el 10% del precio del auto ($${pagoInicialMinimo}).`,
            input: 'number',
            inputLabel: 'Ingresa una cantidad válida para el pago inicial',
            inputValue: pagoInicial,
            showCancelButton: true
        });
        
        if (nuevoPagoInicial === undefined) return;  
        
        pagoInicial = parseFloat(nuevoPagoInicial);
    }

    const montoPrestamo = autoSeleccionado.precio - pagoInicial;
    const tasaInteresAnual = 0.05; 
    const tasaInteresMensual = tasaInteresAnual / 12;
    const numeroMeses = 12;
    const pagoMensual = (montoPrestamo * tasaInteresMensual) / 
                        (1 - Math.pow(1 + tasaInteresMensual, -numeroMeses));

    const tasaImpuesto = 0.08; 
    const montoImpuesto = autoSeleccionado.precio * tasaImpuesto;

    let mensajePrecio;
    if (autoSeleccionado.precio < 25000) {
        mensajePrecio = 'Este es un auto económico.';
    } else if (autoSeleccionado.precio < 40000) {
        mensajePrecio = 'Este auto ofrece un buen equilibrio entre precio y características.';
    } else {
        mensajePrecio = 'Este es un auto de lujo.';
    }

    const mensajeResultado = `${nombre}, tu pago mensual estimado es $${pagoMensual.toFixed(2)}. ${mensajePrecio}`;
    document.getElementById('monthlyPayment').textContent = mensajeResultado;

    Swal.fire('Resultado', `${mensajeResultado} El impuesto es de $${montoImpuesto.toFixed(2)}`, 'success');

    const datosUsuario = { nombre, pagoInicial, autoSeleccionado: autoSeleccionado.nombre, pagoMensual: pagoMensual.toFixed(2) };
    localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(datosUsuario),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(response => response.json())
    .then(data => console.log('Datos enviados al servidor:', data))
    .catch(error => console.error('Error al enviar datos:', error));
}

function calcularInteresRestante(montoRestante, tasaInteresAnual) {
    return montoRestante * (tasaInteresAnual / 12);
}
