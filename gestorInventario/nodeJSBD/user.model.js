module.exports = {
    create: (connection, body, callback) => {
        const { id_categoria } = body;

        // Verificar si la categoría existe antes de la inserción
        connection.query('SELECT COUNT(*) AS count FROM categorias WHERE id_categoria = ?', id_categoria, (err, results) => {
            if (err) {
                console.error('Error al verificar la existencia de la categoría:', err);
                callback({
                    success: false,
                    error: err.message
                });
                return;
            }

            const count = results[0].count;

            // Si no encontramos la categoría, podemos manejar el error aquí o permitir la inserción
            if (count === 0) {
                console.log(`La categoría con id ${id_categoria} no existe en la tabla categorías.`);
                // Puedes decidir cómo manejar este caso, por ejemplo, enviando un error al frontend o insertando el producto sin categoría
                // Ejemplo de inserción sin categoría:
                // delete body.id_categoria; // Eliminar id_categoria del body si no se debe insertar
            }

            // Procedemos con la inserción del producto
            connection.query('INSERT INTO productos SET ?', body, (err, results) => {
                if (err) {
                    console.error('Error al insertar producto:', err);
                    callback({
                        success: false,
                        error: err.message
                    });
                    return;
                }

                console.log('Producto insertado correctamente:', results);
                callback({
                    success: true,
                    productId: results.insertId
                });
            });
        });
    },

    getAll: (connection, callback) => {
        connection.query('SELECT * FROM productos', (err, results) => {
            if (err) {
                console.error('Error al obtener productos:', err);
                callback({
                    success: false,
                    error: err.message
                });
                return;
            }

            console.log('Resultados de la consulta de productos:');
            results.forEach((result, index) => {
                console.log(`Registro ${index + 1}:`, result);
            });

            callback({
                success: true,
                products: results
            });
        });
    }
};
