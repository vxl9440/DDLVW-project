const crud = require('../database/crud')

exports.getAllReasons = function() {
    var sql = 'SELECT reason_id as id,reason_name as name, needsAppt as needsAppt ' +
              'FROM reason';
    return crud.select(sql,[]);
}

exports.insertReason = function(data){
    var sql = 'INSERT INTO reason(reason_name,needsAppt) VALUES(?,?)';
    sqlParam = [data['name'],data['needAppt']?'Y':'N'];
    return crud.insert(sql,sqlParam);
}


exports.updateReason = function(data,targetId){
    var sql = 'UPDATE reason SET reason_name = ?,needsAppt = ? WHERE reason_id = ?';
    var sqlParam = [data['name'],data['needAppt']?'Y':'N',parseInt(targetId)];
    return crud.update(sql,sqlParam);
}

exports.deleteReason = function (targetId) {
    var sql = 'DELETE FROM reason WHERE reason_id = ?';
    return crud.delete(sql,[targetId]);
}