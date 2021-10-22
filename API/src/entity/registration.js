import { transaction } from '../database/crud.js';
import { getTimeStamp } from '../util/timeUtil.js';

function constructReasonAssoc(sqls, sqlParams, reasons) {
    for (const reason of reasons) {
        sqls.push('INSERT INTO registration_reason_assoc(registration_id,reason_id) VALUES(?,?)')
        sqlParams.push([reason]);
    }
} 

export function insertRegistration(data) {
    const sql = 'INSERT INTO registration(advisor_id,check_in_time,'+
              'scheduled,student_username,student_name) VALUES'+
              '(?,?,?,?,?)';

    const advisorId   = parseInt(data['meetingHost']);
    const timeIn      = getTimeStamp(new Date(data['timeIn']));
    const scheduled   = data['hasAppt'];
    const stuUsername = data['studentUsername'];
    const stuName     = data['studentName'];

    const queries = [sql];
    let sqlParams = [[advisorId, timeIn, scheduled, stuUsername, stuName]];
    
    constructReasonAssoc(queries, sqlParams, data['reasons']);

    return transaction(queries, sqlParams); 
}