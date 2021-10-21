const connection = require('./connection').getConnection();
const msgUtil = require('../util/messageUtil');

function doAll(sql,sqlParam,flag){
    return new Promise((resolve,reject)=>{
        connection.query(sql,sqlParam, function (error,result,field) {
            if (!error) {
                if(flag !== undefined) resolve(result);
                else resolve(msgUtil.getSuccessDataSet());
            }else{
                reject(msgUtil.getFailDataSet());
            }
            // if(flag === undefined) connection.end();
        })
    });
}


exports.transcation = async function(sqls,sqlParams) {
    await connection.beginTransaction();
    try{
        var res = await doAll(sqls[0],sqlParams[0],1);
        for(var i = 1;i < sqls.length;i++){
            sqlParams[i].unshift(res.insertId);
            var t = await doAll(sqls[i],sqlParams[i],1);
        }

        await connection.commit();
    }catch(err){ 
        await connection.rollback();
        return msgUtil.getFailDataSet();
    }finally{
        // connection.end();
    }
    return msgUtil.getSuccessDataSet();
}

exports.select = function(sql,sqlParam){
    return new Promise((resolve,reject)=>{
        connection.query(sql,sqlParam, function (error,result,field) {
            if (!error) {
                resolve(result);
            }
            // connection.end();
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

