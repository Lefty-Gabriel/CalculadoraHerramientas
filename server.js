

const express = require('express');
const app = express();
const path = require('path');

const { guardarProducto, obtenerProductos } = require('./datos/productosRepo');
const { calcularPrecioFinal } = require('./logica/calculadora');

app.use(express.json());


app.use(express.static(path.join(__dirname, 'presentacion')));

app.post('/api/productos', (req, res) => {
    const { nombre, precio } = req.body;

    const calculo = calcularPrecioFinal(precio);

    const producto = {
        nombre,
        ...calculo
    };

    guardarProducto(producto);

    res.json({ mensaje: "Producto guardado", producto });
});


app.get('/api/productos', (req, res) => {
    res.json(obtenerProductos());
});


app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
