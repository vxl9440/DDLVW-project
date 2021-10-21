const crud = require('../database/crud')

/**
 * Get all reason from DB
 * @returns result set
 */
exports.getAllReasons = function() {
    var sql = 'SELECT reason_id as id,reason_name as name, needsAppt as needsAppt ' +
              'FROM reason';
    return crud.select(sql,[]);
}

/**
 * insert a new reason into DB
 * @param {*} data new reason data
 * @returns SUCCESS or FAIL
 */
exports.insertReason = function(data){
    var sql = 'INSERT INTO reason(reason_name,needsAppt) VALUES(?,?)';
    sqlParam = [data['name'],data['needsAppt']?'Y':'N'];
    return crud.insert(sql,sqlParam);
}

/**
 * update reason data
 * @param {*} data reason data that to be updated
 * @param {*} targetId reason id
 * @returns SUCCESS or FAIL
 */
exports.updateReason = function(data,targetId){
    var sql = 'UPDATE reason SET reason_name = ?,needsAppt = ? WHERE reason_id = ?';
    var sqlParam = [data['name'],data['needsAppt']?'Y':'N',parseInt(targetId)];
    return crud.update(sql,sqlParam);
}

/**
 * 
 * @param {*} targetId reason id
 * @returns SUCCESS or FAIL
 */
exports.deleteReason = function (targetId) {
    var sql = 'DELETE FROM reason WHERE reason_id = ?';
    return crud.delete(sql,[targetId]);
}