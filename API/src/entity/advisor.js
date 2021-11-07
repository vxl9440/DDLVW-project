import { select, insert, update, _delete } from '../database/crud.js';
import { getCurrentWeekDay, getCurrentTime } from '../util/timeUtil.js';

/**
 * Get all advisor information
 * @returns result set
 */
export function getAllAdvisors() {
    const sql = 'SELECT advisor_id as id,first_name as firstName,' +
                      'middle_name as middleName,last_name as lastName,' +
                      'ritEmail as email,portrait_url as portraitURL, enabled '+
                      'FROM advisor';

    return select(sql, []);
}

/**
 * @param {*} targetId Get a advisor by advisor id
 * @returns result set
 */
export function getAdvisorById(targetId) {
    const sql = 'SELECT advisor_id as id,first_name as firstName,' +
                     'middle_name as middleName,last_name as lastName,' +
                     'ritEmail as email,portrait_url as portraitURL, '+
                     'enabled FROM advisor '+
                     'WHERE advisor_id = ?';

    return select(sql, [parseInt(targetId)]);
}


export function getAdvisorByEmail(email) {
    const sql = 'SELECT advisor_id as id,first_name as firstName,' +
                     'middle_name as middleName,last_name as lastName,' +
                     'ritEmail as email,portrait_url as portraitURL, '+
                     'enabled FROM advisor '+
                     'WHERE ritEmail = ?';

    return select(sql, [email]);
}

/**
 * Get a advisor's walk-in hour of current date
 * @returns result set
 */
export function getAdvisorByWalkInAvailability() {
    const sql = 'SELECT a.advisor_id as id, a.first_name as firstName, ' +
                     'a.middle_name as middleName, a.last_name as lastName, ' +
                     'a.ritEmail as email, a.portrait_url as portraitURL, ' +
                     'w.id as hourId, w.start_time as startTime, w.end_time as endTime, w.weekday ' +
                     'FROM advisor a INNER JOIN walk_in_hour w ON ' +
                     'a.advisor_id = w.advisor_id WHERE a.enabled = true ' + 
                     'AND w.weekday = ? AND (? between w.start_time AND w.end_time)';

    return new Promise((resolve, reject) => {
        select(sql, [getCurrentWeekDay(), getCurrentTime()])
            .then(advisors => resolve(advisors.reduce(advisorReducer, [])))
            .catch(err => reject(err));
    });
}

// converts results from a mysql join query to an array of rich json objects without duplicate data
function advisorReducer(prevAdvisor, advisor) {
    const previousAdvisor = prevAdvisor[prevAdvisor.length - 1]
         
    if (previousAdvisor !== undefined && previousAdvisor.id === advisor.id) {
       
        // duplicate, add unique walk in hour data and disregard the rest
        previousAdvisor['walkInHours'].push(
            (({ hourId, startTime, endTime, weekday }) => ({ 
                'id': hourId, startTime, endTime, weekday 
            }))(advisor)
        );
        
    } else {
        // need to make walk in hour data into a nested obj
        prevAdvisor.push({
            'id': advisor.id,
            'firstName': advisor.firstName,
            'middleName': advisor.middleName,
            'lastName': advisor.lastName,
            'email': advisor.email,
            'portraitURL': advisor.portraitURL,
            'walkInHours': [
                {
                    'id': advisor.hourId,
                    'startTime': advisor.startTime,
                    'endTime': advisor.endTime,
                    'weekday': advisor.weekday
                }
            ]
        });
    }
    
    return prevAdvisor;
}

/**
 * Insert a advisor into DB
 * @param {*} data advisor's data from front end
 * @returns SUCCESS or FAIL
 */
export function insertAdvisor(data) {
    if (verifyEmail(data['email'])) {
        const sql = 'INSERT INTO advisor(first_name,middle_name,last_name,ritEmail,portrait_url)'+
        'VALUES(?,?,?,?,?)';
        const sqlParam = [data['firstName'], data['middleName'] === '' ? null : data['middleName'],
              data['lastName'], data['email'], data['portraitURL']];

        return insert(sql, sqlParam);
    } else {
        return Promise.reject({
            'message':'Error: Email address provided is not a valid RIT email.'
        });
    }
    
}


function verifyEmail(email) {
    // TODO
    return true;
}

/**
 * Update a advisor's information
 * @param {*} data advisor's information that to be updated
 * @param {*} targetId advisor id
 * @returns SUCCESS or FAIL
 */
export function updateAdvisor(data, targetId) {
    const sql = 'UPDATE advisor SET first_name = ?,middle_name = ?,last_name = ?,'+
                                  'ritEmail = ?,portrait_url = ?, enabled = ? '+
                                  'WHERE advisor_id = ?';
    const sqlParam = [data['firstName'], data['middle'] === '' ? null : data['middle'],
            data['lastName'], data['email'], data['portraitURL'], data['enabled'], parseInt(targetId)];

    return update(sql, sqlParam);
}


/**
 * delete a advisor from DB
 * @param {*} targetId advisor id
 * @returns SUCCESS or FAIL
 */
export function deleteAdvisor(targetId) {
    const sql = 'DELETE FROM advisor WHERE advisor_id = ?';

    return _delete(sql, [parseInt(targetId)]);
}