import { exec } from 'child_process';
import { getCurrentDay } from '../util/timeUtil.js';

const python_file_location = '../../outlook.py';

/**
 * 
 * @param {*} stdout the content of standard output after python ran
 * @param {*} studentUsername username of a student
 * @returns appointment data
 */
function checkAndConstructDateset(stdout, studentUsername) {
    const appointment = {};
    const events = JSON.parse(stdout.replace(/'/g, '\"'));
    for (const event of events) {
        let flag = false;
        for (const attendee of event['attendees']) {
            const username = attendee['email'].split('@')[0];
            if (username === studentUsername) {
                appointment['advisorName'] = 'test name';
                appointment['startTime'] = event['startTime'];
                appointment['endTime'] = event['endTime'];
                flag = true;
                break;
            }
        }
        if (flag) {
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
function constructReturnData(ldapData, appointment) {
    ldapData['hasAppt'] = false;
    if (appointment['advisorName'] !== undefined) {
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
export function getTodayOutlookCalendar(ldapData) {
    // console.log(timeUtil.getCurrentDay(false));
    // console.log(timeUtil.getCurrentDay(true));
    const params = `${ python_file_location } ${ getCurrentDay(false) } ${ getCurrentDay(true) }`;
    return new Promise((resolve, reject) => {
        exec(`python ${params}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                reject(error);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                reject(error);
            }
            const appointment = checkAndConstructDateset(stdout, ldapData['studentUsername']);
            resolve(constructReturnData(ldapData, appointment));
        });
    });
}

