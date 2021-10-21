const crud = require('../database/crud')
const timeUtil = require('../util/timeUtil')


/**
 * Get all advisor information
 * @returns result set
 */
exports.getAllAdvisors = function() {
    var sql = 'SELECT advisor_id as id,first_name as firstName,' +
                      'middle_name as middleName,last_name as lastName,' +
                      'username as username,portrait_url as portraitURL '+
                      'FROM advisor';
    return crud.select(sql,[]);
}

/**
 * @param {*} targetId Get a advisor by advisor id
 * @returns result set
 */
exports.getAdvisorById = function(targetId) {
    var sql = 'SELECT advisor_id as id,first_name as firstName,' +
                     'middle_name as middleName,last_name as lastName,' +
                     'username as username,portrait_url as portraitURL '+
                     'FROM advisor '+
                     'WHERE advisor_id = ?';
    return crud.select(sql,[parseInt(targetId)]);
}

/**
 * Get a advisor's walk-in hour of current date
 * @returns result set
 */
exports.getAdvisorByWalkInAvailability = function(){
    var sql = 'SELECT a.advisor_id as id,a.first_name as firstName,' +
                     'a.middle_name as middleName,a.last_name as lastName,' +
                     'a.username as username,a.portrait_url as portraitURL '+
                     'FROM advisor a, walk_in_hour w '+
                     'WHERE a.advisor_id = w.advisor_id AND a.is_available = ? AND '+ 
                     'w.weekday = ? AND (? between w.start_time AND w.end_time)';
    return crud.select(sql,['Y',timeUtil.getCurrentWeekDay(),timeUtil.getCurrentTime()]);
}

/**
 * Insert a advisor into DB
 * @param {*} data advisor's data from front end
 * @returns SUCCESS or FAIL
 */
exports.insertAdvisor = function(data){
    var sql = 'INSERT INTO advisor(first_name,middle_name,last_name,username,portrait_url)'+
              'VALUES(?,?,?,?,?)';
    var sqlParam = [data['firstName'],data['middleName'] === ''?null:data['middleName'],
                    data['lastName'],data['username'],data['portraitURL']];
    return crud.insert(sql,sqlParam);
}

/**
 * Update a advisor's information
 * @param {*} data advisor's information that to be updated
 * @param {*} targetId advisor id
 * @returns SUCCESS or FAIL
 */
exports.updateAdvisor = function(data,targetId){
    var sql = 'UPDATE advisor SET first_name = ?,middle_name = ?,last_name = ?,'+
                                  'username = ?,portrait_url = ? '+
                                  'WHERE advisor_id = ?';
    var sqlParam = [data['firstName'],data['middle'] === ''?null:data['middle'],
                    data['lastName'],data['username'],data['portraitURL'],parseInt(targetId)];
    return crud.update(sql,sqlParam);
}

/**
 * delete a advisor from DB
 * @param {*} targetId advisor id
 * @returns SUCCESS or FAIL
 */
exports.deleteAdvisor = function (targetId) {
    var sql = 'DELETE FROM advisor WHERE advisor_id = ?';
    return crud.delete(sql,[parseInt(targetId)]);
}