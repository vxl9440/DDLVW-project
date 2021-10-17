const connection = require('./connection').getConnection();

const executeQuery = function doAll(sql, sqlParam) {
    return new Promise((resolve, reject) => {
        connection.query(sql, sqlParam, function(error, result, field) {
            const responseData = {
                'message':'SUCCESS',
                'statusCode': 1
            };

            if (!error) {
                resolve(responseData);
            } else {
                responseData['message'] = 'Fail';
                responseData['statusCode'] = -1;
                reject(responseData);
            }
        })
    });
}


exports.select = function(sql,sqlParam) {
    return new Promise((resolve, reject) => {
        connection.query(sql, sqlParam, function(error, result, field) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

exports.insert = executeQuery;

exports.update = executeQuery;

exports.delete = executeQuery;
