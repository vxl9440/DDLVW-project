import { select, insert, update, _delete } from '../database/crud.js';

/**
 * Get all reason from DB
 * @returns result set
 */
export function getAllReasons() {
    const sql = 'SELECT reason_id as id, reason_name as name, needsAppt as needsAppt ' +
              'FROM reason';

    return new Promise((resolve, reject) => {
        select(sql, [])
            .then(reasons => {
                reasons.forEach(reason => reason.needsAppt = Boolean(reason.needsAppt));
                resolve(reasons);
            })
            .catch(err => reject(err));
    });
}

/**
 * insert a new reason into DB
 * @param {*} data new reason data
 * @returns SUCCESS or FAIL
 */
export function insertReason(data) {
    const sql = 'INSERT INTO reason(reason_name,needsAppt) VALUES(?,?)';
    const sqlParam = [data['name'], data['needsAppt']];
    return insert(sql, sqlParam);
}

/**
 * update reason data
 * @param {*} data reason data that to be updated
 * @param {*} targetId reason id
 * @returns SUCCESS or FAIL
 */
export function updateReason(data, targetId) {
    const sql = 'UPDATE reason SET reason_name = ?,needsAppt = ? WHERE reason_id = ?';
    const sqlParam = [data['name'], data['needsAppt'], parseInt(targetId)];
    
    return update(sql, sqlParam);
}

/**
 * 
 * @param {*} targetId reason id
 * @returns SUCCESS or FAIL
 */
export function deleteReason(targetId) {
    const sql = 'DELETE FROM reason WHERE reason_id = ?';
    
    return _delete(sql, [targetId]);
}