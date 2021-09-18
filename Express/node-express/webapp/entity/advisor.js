const crud = require('../database/crud')

exports.getAllAdvisors = function() {
    var sql = 'SELECT advisor_id as id,a_first_name as firstName,' +
                      'a_middle_name as middleName,a_last_name as lastName,' +
                      'username as username,portrait_url as portraitURL '+
                      'FROM advisor';
    return crud.select(sql,[]);
}

exports.getAdvisorById = function(targetId) {
    var sql = 'SELECT advisor_id as id,a_first_name as firstName,' +
                     'a_middle_name as middleName,a_last_name as lastName,' +
                     'username as username,portrait_url as portraitURL '+
                     'FROM advisor '+
                     'WHERE advisor_id = ?';
    return crud.select(sql,[parseInt(targetId)]);
}

exports.insertAdvisor = function(data){
    var sql = 'INSERT INTO advisor(a_first_name,a_middle_name,a_last_name,username,portrait_url)'+
              'VALUES(?,?,?,?,?)';
    var sqlParam = [data['firstName'],data['middleName'] === ''?null:data['middleName'],
                    data['lastName'],data['username'],data['portraitURL']];
    return crud.insert(sql,sqlParam);
}


exports.updateAdvisor = function(data,targetId){
    var sql = 'UPDATE advisor SET a_first_name = ?,a_middle_name = ?,a_last_name = ?,'+
                                  'username = ?,portrait_url = ? '+
                                  'WHERE advisor_id = ?';
    var sqlParam = [data['firstName'],data['middle'] === ''?null:data['middle'],
                    data['lastName'],data['username'],data['portraitURL'],parseInt(targetId)];
    return crud.update(sql,sqlParam);
}

exports.deleteAdvisor = function (targetId) {
    var sql = 'DELETE FROM advisor WHERE advisor_id = ?';
    return crud.delete(sql,[parseInt(targetId)]);
}