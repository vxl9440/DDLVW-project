const crud = require('../database/crud')

exports.getAllReasons = function() {
    const sql = 'SELECT reason_id as id,reason_name as name, needsAppt as needsAppt ' +
              'FROM reason';

    return crud.select(sql, []);
}

exports.insertReason = function(data) {
    const sql = 'INSERT INTO reason(reason_name,needsAppt) VALUES(?,?)';
    sqlParam = [data['name'], data['needsAppt']];
    
    return crud.insert(sql, sqlParam);
}

exports.updateReason = function(data, targetId) {
    const sql = 'UPDATE reason SET reason_name = ?,needsAppt = ? WHERE reason_id = ?';
    const sqlParam = [data['name'], data['needsAppt'], parseInt(targetId)];
    
    return crud.update(sql, sqlParam);
}

exports.deleteReason = function(targetId) {
    const sql = 'DELETE FROM reason WHERE reason_id = ?';
    
    return crud.delete(sql, [targetId]);
}