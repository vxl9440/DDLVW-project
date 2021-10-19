import { select } from '../database/crud.js';

export function getWalkInHoursByAdvisorId(targetId) {
    const sql = 'SELECT start_time as startTime,end_time as endTime ' +
              'FROM walk_in_hour ' +
              'WHERE advisor_id = ?';
              
    return select(sql, [targetId]);
}
