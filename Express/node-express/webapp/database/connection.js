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

