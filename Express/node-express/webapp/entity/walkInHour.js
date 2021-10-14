const crud = require('../database/crud')

exports.getWorkInHoursByAdvisorId = function(targetId){
    var sql = 'SELECT start_time as startTime,end_time as endTime '+
              'FROM walk_in_hour '+
              'WHERE advisor_id = ?';
    return crud.select(sql,[targetId]);
}
