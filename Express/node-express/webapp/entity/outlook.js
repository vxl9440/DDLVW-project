const {exec} = require('child_process')
const timeUtil = require('../util/timeUtil');

const python_file_location = 'C:\\Users\\miaox\\Desktop\\500-node\\outlook.py';

/**
 * 
 * @param {*} stdout the content of standard output after python ran
 * @param {*} studentUsername username of a student
 * @returns appoinemtn data
 */
function checkAndConstructDateset(stdout,studentUsername){
    var appointment = {};
    var events = JSON.parse(stdout.replace(/'/g, '\"'));
    for(const event of events){
        var flag = false;
        for(const attendee of event['attendees']){
            var username = attendee['email'].split('@')[0];
            if(username === studentUsername){
                appointment['advisorName'] = 'test name';
                appointment['startTime'] = event['startTime'];
                appointment['endTime'] = event['endTime'];
                flag = true;
                break;
            }
        }
        if(flag){
            break;
        }
    }
    return appointment;
}

/**
 * 
 * @param {*} ldapData data regrad a student from ldap
 * @param {*} appointment appointment data of a student
 * @returns changed ldap data
 */
function constrctReturnData(ldapData,appointment){
    ldapData['hasAppt'] = false;
    if(appointment['advisorName'] !== undefined){
        ldapData['appointment'] = appointment;
        ldapData['hasAppt'] = true;
    }
    return ldapData;
}

/**
 * 
 * @param {*} ldapData data regrad a student from ldap
 * @returns a promise object
 */
exports.getTodayOutlookCalendar = function(ldapData){
    var params = `${python_file_location} ${timeUtil.getCurrentDay(false)} ${timeUtil.getCurrentDay(true)}`
    return new Promise((resolve,reject)=>{
        exec(`python ${params}`,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            var appointment = checkAndConstructDateset(stdout,ldapData['studentUsername']);
            resolve(constrctReturnData(ldapData,appointment));
        });
    });
}

