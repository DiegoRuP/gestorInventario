module.exports = {
    create: (connection, body, callback) => {
        const { id_categoria } = body;

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

            if (count === 0) {
                console.log(`La categoría con id ${id_categoria} no existe en la tabla categorías.`);

            }

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

    delete: (connection, id_producto, callback) => {
        connection.query('DELETE FROM productos WHERE id_producto = ?', [id_producto], (err, results) => {
            if (err) {
                console.error('Error al eliminar producto:', err);
                callback({
                    success: false,
                    error: err.message
                });
                return;
            }

            console.log('Producto eliminado correctamente:', results);
            callback({
                success: true,
                affectedRows: results.affectedRows
            });
        });
    },
    update: (connection, id_producto, body, callback) => {
        const { nombre, descripcion, id_categoria, marca, precio_compra, precio_venta, cantidad_stock, unidad_medida, id_proveedor, fecha_ingreso, fecha_caducidad, codigo_barras } = body;
      
        const sql = `UPDATE productos SET nombre = ?, descripcion = ?, id_categoria = ?, marca = ?, precio_compra = ?, precio_venta = ?, cantidad_stock = ?, unidad_medida = ?, id_proveedor = ?, fecha_ingreso = ?, fecha_caducidad = ?, codigo_barras = ? WHERE id_producto = ?`;
      
        connection.query(sql, [nombre, descripcion, id_categoria, marca, precio_compra, precio_venta, cantidad_stock, unidad_medida, id_proveedor, fecha_ingreso, fecha_caducidad, codigo_barras, id_producto], (err, results) => {
          if (err) {
            console.error('Error al actualizar producto:', err);
            callback({
              success: false,
              error: err.message
            });
            return;
          }
      
          console.log('Producto actualizado correctamente:', results);
          callback({
            success: true,
            affectedRows: results.affectedRows
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
