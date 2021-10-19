import { select, insert, update, _delete } from '../database/crud.js';

export function getAllReasons() {
    const sql = 'SELECT reason_id as id,reason_name as name, needsAppt as needsAppt ' +
              'FROM reason';

    return select(sql, []);
}

export function insertReason(data) {
    const sql = 'INSERT INTO reason(reason_name,needsAppt) VALUES(?,?)';
    sqlParam = [data['name'], data['needsAppt']];
    
    return insert(sql, sqlParam);
}

export function updateReason(data, targetId) {
    const sql = 'UPDATE reason SET reason_name = ?,needsAppt = ? WHERE reason_id = ?';
    const sqlParam = [data['name'], data['needsAppt'], parseInt(targetId)];
    
    return update(sql, sqlParam);
}

export function deleteReason(targetId) {
    const sql = 'DELETE FROM reason WHERE reason_id = ?';
    
    return _delete(sql, [targetId]);
}