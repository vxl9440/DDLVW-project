const crud = require('../database/crud')

/**
 * 
 * @param {*} targetId advisor id
 * @returns a list of walk-in hour data
 */
exports.getWorkInHoursByAdvisorId = function(targetId){
    var sql = 'SELECT start_time as startTime,end_time as endTime,weekday as weekday '+
              'FROM walk_in_hour '+
              'WHERE advisor_id = ?'; 
    return crud.select(sql,[targetId]);
}
