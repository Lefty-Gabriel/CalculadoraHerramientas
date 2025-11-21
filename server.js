

const express = require('express');
const app = express();
const path = require('path');

const { guardarProducto, obtenerProductos } = require('./Datos/productosRepo');
const { calcularPrecioFinal } = require('./Logica/calculadora');

app.use(express.json());

const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,40}$/;

app.use(express.static(path.join(__dirname, 'Presentacion')));


app.post('/api/productos', (req, res) => {
    const { nombre, precio } = req.body;


    if (!nombre || !nombreRegex.test(nombre)) {
        return res.status(400).json({ error: "Nombre inválido. Solo letras y espacios (3 a 40 caracteres)." });
    }

    if (isNaN(precio) || precio <= 0) {
        return res.status(400).json({ error: "Precio inválido. Debe ser un número mayor a 0." });
    }

    const calculo = calcularPrecioFinal(Number(precio));

    const producto = {
        nombre,
        ...calculo
    };

    guardarProducto(producto);

    res.json({ mensaje: "Producto guardado correctamente", producto });
});

app.get('/api/productos', (req, res) => {
    res.json(obtenerProductos());
});


app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
