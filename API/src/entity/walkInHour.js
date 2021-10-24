import { insert, select, update, _delete } from '../database/crud.js';

/**
 * 
 * @param {*} targetId advisor id
 * @returns a list of walk-in hour data
 */
export function getWalkInHoursByAdvisorId(targetId) {
    const sql = 'SELECT id, start_time as startTime,end_time as endTime, weekday ' +
              'FROM walk_in_hour ' +
              'WHERE advisor_id = ?';
              
    return select(sql, [targetId]);
}


export function updateWalkInHours(hourId, walkInHours) {
    const sql = 'UPDATE walk_in_hour SET start_time = ?, end_time = ?, weekday = ? WHERE id = ?';
    const params = [walkInHours['startTime'], walkInHours['endTime'], walkInHours['weekday'], hourId];
    return update(sql, params);
}

export function deleteWalkInHours(walkInHourId) {
    const sql = 'DELETE from walk_in_hour WHERE id = ?';
    return _delete(sql, [walkInHourId]);
}

export function addWalkInHours(advisorId, walkInHours) {
    let queryPlaceHolder = '';
    let hoursToInsert = [];
    
    for (const i in walkInHours) {
        const hours = walkInHours[i];
        queryPlaceHolder = queryPlaceHolder.concat('(?,?,?,?),');
        hoursToInsert.push(hours['startTime'], hours['endTime'], hours['weekday'], advisorId);
    }
   
    const sql = `INSERT INTO walk_in_hour(start_time, end_time, weekday, advisor_id) VALUES ${ queryPlaceHolder.replace(/.$/, ";") }`;
    return insert(sql, hoursToInsert);
}