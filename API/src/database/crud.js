import { getConnection } from './connection.js';

const connection = getConnection();

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
                responseData['message'] = 'Fail: ' + error;
                responseData['statusCode'] = -1;
                reject(responseData);
            }
        });
    });
}


export function transaction(queries, sqlParams) {
    return new Promise((resolve, reject) => {
        connection.beginTransaction(async (err) => {
            if (err) { 
                console.log("error beginning transaction", err);
                reject(err); 
            }
            try {
                const res = await executeQuery(queries[0], sqlParams[0]);
                
                for (var i = 1; i < queries.length; i++) {
                    sqlParams[i].unshift(res.insertId);
                    await executeQuery(queries[i], sqlParams[i]);
                }
        
                connection.commit((err) => {
                    if (err) {
                        connection.rollback(() => {
                            console.log("error committing transaction", err);
                            reject(err)});
                    } else {
                        resolve();
                    }
                });

            } catch(err) { 
                connection.rollback(() => {
                    console.log("error something", err);
                    reject(err)});
            }
        });
    });
}


export function select(sql,sqlParam) {
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

export const insert = executeQuery;

export const update = executeQuery;

export const _delete = executeQuery;
