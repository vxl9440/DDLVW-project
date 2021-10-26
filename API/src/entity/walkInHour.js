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


export function updateWalkInHours(advisorId, walkInHours) {
    const sql = 'INSERT INTO walk_in_hour (id, start_time, end_time, weekday, advisor_id) VALUES ? ' +
            'ON DUPLICATE KEY UPDATE start_time = VALUES(start_time), end_time = VALUES(end_time), weekday = VALUES(weekday), advisor_id = VALUES(advisor_id);'

    walkInHours = JSON.parse(JSON.stringify(walkInHours)
                                .replace(new RegExp('"startTime":', 'gm'), `\"start_time\":`)
                                .replace(new RegExp('"endTime":', 'gm'), `\"end_time\":`));
    

    walkInHours.forEach(hour => hour['advisor_id'] = advisorId);


    walkInHours = walkInHours.map(hour => [hour.id, hour.start_time, hour.end_time, hour.weekday, hour.advisor_id]);

    return update(sql, [walkInHours]);
}


export function deleteWalkInHours(advisorId) {
    const sql = 'DELETE from walk_in_hour WHERE advisor_id = ?';
    return _delete(sql, [advisorId]);
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