const sql = require('mysql')

exports.getConnection = function(){
     return sql.createConnection({
        host:"localhost",
        port:3306,
        user:"root",
        password:"Qq1196726420!",
        database:"iste500"
    });
}

// var pool      =    sql.createPool({
//     connectionLimit : 5,
//     host     : '127.0.0.1',
//     user     : 'root',
//     password : 'Qq1196726420',
//     database : 'iste500',
// });    
// module.exports = pool;
