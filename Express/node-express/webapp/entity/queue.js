const connection = require('../database/connection').getConnection();

exports.insert = function(data){
    var sql = 'INSERT INTO accounts(first_name,last_name,balance) values(?,?,?)'
    var sqlParam = data
    return new Promise((resolve,reject)=>{
        connection.query(sql, sqlParam, function (error,result,field) {
            if (!error) {
                resolve(result)
            } else {
            
            }
        })
    })
}