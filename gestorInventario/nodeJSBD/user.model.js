module.exports = {
    create: (conection, body, callback) => {
        conection.query('INSERT INTO productos SET ?', body, (err, results) => {
            if (err){
                callback({
                    array: null,
                    id: null,
                    success: false,
                    err: JSON.stringify(err)
                });
                return;
            }
            callback({
                array: null,
                id: null,
                success: true
            });
        });
    },

    getAll: (connection, callback) => {
        connection.query('select * from productos', (err, results) => {
            if (err){
                callback({
                    array: null,
                    id: null,
                    success: false,
                    err: JSON.stringify(err)
                });
                return;
            }

            console.log('Resultados de la consulta:');
            results.forEach((result, index) => {
                console.log(`Registro ${index + 1}:`, result);
            });
            
            callback({
                array: results,
                id: null,
                success: true
            });
        });
    }
}