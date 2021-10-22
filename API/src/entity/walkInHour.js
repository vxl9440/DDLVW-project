import { select } from '../database/crud.js';

/**
 * 
 * @param {*} targetId advisor id
 * @returns a list of walk-in hour data
 */
export function getWalkInHoursByAdvisorId(targetId) {
    const sql = 'SELECT start_time as startTime,end_time as endTime, weekday ' +
              'FROM walk_in_hour ' +
              'WHERE advisor_id = ?';
              
    return select(sql, [targetId]);
}
