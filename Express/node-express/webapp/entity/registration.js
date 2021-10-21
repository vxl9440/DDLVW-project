const crud = require('../database/crud')
const timeUtil = require('../util/timeUtil');


function constructReasonAssoc(sqls,sqlParams,reasons){
    for(const reason of reasons){
        sqls.push('INSERT INTO registration_reason_assoc(registration_id,reason_id) VALUES(?,?)')
        sqlParams.push([reason]);
    }
} 

exports.insertRegistration = function (data) {
    var sql = 'INSERT INTO registration(advisor_id,check_in_time,'+
              'appointment_type,student_username,student_name) VALUES'+
              '(?,?,?,?,?)';

    var var1 = parseInt(data['meetingHost']);
    var var2 = timeUtil.getTimeStamp(new Date(data['timeIn']));
    var var3 = data['hasAppt']?'1':'0';
    var var4 = data['studentUsername'];
    var var5 = data['studentName'];
    var sqls = [sql];
    var sqlParams = [[var1,var2,var3,var4,var5]];
    constructReasonAssoc(sqls,sqlParams,data['reasons']);
    return crud.transcation(sqls,sqlParams); 
}