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
                responseData['message'] = 'Fail';
                responseData['statusCode'] = -1;
                reject(responseData);
            }
        });
    });
}


export function transaction(queries, sqlParams) {
    connection.beginTransaction((err) => {
        if (err) { throw err; }
        try {
            const res = await doAll(queries[0], sqlParams[0]);
            
            for (var i = 1; i < queries.length; i++) {
                sqlParams[i].unshift(res.insertId);
                await doAll(queries[i], sqlParams[i]);
            }
    
            connection.commit((err) => {
                if (err) {
                    return connection.rollback(() => {
                        return { 'Transaction error while committing': err }; 
                    });
                }
            })
        } catch(err) { 
            return connection.rollback(() => {
                return { 'Transaction error': err };
            });
        }
    });

    return {
        'message':'SUCCESS',
        'statusCode': 1
    }
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
