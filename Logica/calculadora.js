function calcularPrecioFinal(precio) {
    const iva = precio * 0.12;
    const total = precio + iva;

    return {
        subtotal: precio,
        iva,
        total
    };
}

module.exports = { calcularPrecioFinal };
