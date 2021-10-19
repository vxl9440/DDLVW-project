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
