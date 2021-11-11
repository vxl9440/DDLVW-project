import { transaction,update } from '../database/crud.js';
import { getTimeStamp } from '../util/timeUtil.js';

function constructReasonAssoc(sqls, sqlParams, reasons) {
    for (const reason of reasons) {
        sqls.push('INSERT INTO registration_reason_assoc(registration_id,reason_id) VALUES(?,?)');
        sqlParams.push([reason]);
    }
} 

export function insertRegistration(data) {
    const sql = 'INSERT INTO registration(advisor_id,check_in_time,'+
              'scheduled,student_username,student_name) VALUES'+
              '(?,?,?,?,?)';

    const advisorId   = parseInt(data['meetingHost']);
    const timeIn      = getTimeStamp(new Date(data['timeIn']));
    const scheduled   = data['appointment'];
    const stuUsername = data['username'];
    const stuName     = data['studentName'];

    const queries = [sql];
    let sqlParams = [[advisorId, timeIn, scheduled, stuUsername, stuName]];
    
    constructReasonAssoc(queries, sqlParams, data['reasons']);

    return transaction(queries, sqlParams); 
}


export function updateMeetingStartTime(data){
    const sql = 'UPDATE registration SET meeting_start_time = ? WHERE check_in_time = ?';
    const sqlParam = [getTimeStamp(data['meetingStartTime']),getTimeStamp(data['timeIn'])];
    return update(sql,sqlParam);
}