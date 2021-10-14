const connection = require('./connection').getConnection();

function doAll(sql,sqlParam){
    return new Promise((resolve,reject)=>{
        connection.query(sql,sqlParam, function (error,result,field) {
            var responseData = {
                'message':'SUCCESS',
                'statusCode': 1
            };
            if (!error) {
                resolve(responseData);
            }else{
                responseData['message'] = 'Fail';
                responseData['statusCode'] = -1;
                reject(responseData);
            }
        })
    });
}

exports.select = function(sql,sqlParam){
    return new Promise((resolve,reject)=>{
        connection.query(sql,sqlParam, function (error,result,field) {
            console.log(error);
            if (!error) {
                resolve(result);
            }
        })
    });
}

exports.insert = function (sql,sqlParam) {
    return doAll(sql,sqlParam);
}

exports.update = function (sql,sqlParam) {
    return doAll(sql,sqlParam);
}

exports.delete = function (sql,sqlParam) {
    return doAll(sql,sqlParam);
}

