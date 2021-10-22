import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(import.meta.url);
const fileLocation = path.resolve(__dirname, '../../../queue.json');

/**
 * 
 * @returns string content of a file
 */
function read() {
    return JSON.parse(readFileSync(fileLocation));
}

/**
 * 
 * @param {*} queue queue object
 * @returns SUCCESS or FAIL
 */
function write(queue) {
    const returnData = {
        "message": "Success"
    };

    try {
        writeFileSync(fileLocation, JSON.stringify(queue, null, 2));
    } catch (err) {
        returnData['message'] = 'Fail';
        return returnData;
    }

    return returnData;
}

/**
 * 
 * @param {*} queue queue object
 * @param {*} advisorId advisor id
 * @returns index of targeted advisor in queue list
 */
function findAdvisorByObjIndex(queue, advisorId) {
    for (var i = 0; i < queue.length; i++) {
        if (queue[i]['meetingHost'] === advisorId) {
            return i;
        }
    }

    return -1;
}

/**
 * 
 * @param {*} queue queue object
 * @param {*} advisorIndex index of a advisor in queue list
 * @param {*} studentUsername username of a student
 * @returns index of targeted student in targeted advisor's index in queue list
 */
function findStudentPositionByAdvisorId(queue, advisorIndex, studentUsername) {
    if (queue[advisorIndex]) {
        if (queue[advisorIndex['queue']]) {
            for (var i = 0; i < queue[advisorIndex]['queue'].length; i++) {
                if (queue[advisorIndex]['queue'][k]['username'] === studentUsername) {
                    return i;
                }
            }
        }
    }
    

    return -1;
}

/**
 * insert a advisor in the queue
 * @param {*} queue queue object
 * @param {*} advisorId advisor id
 */
function insertAdvisor(queue, advisorId) {
    const advisorObj = {
        "meetingHost": advisorId,
        "queue": []
    }
    queue.push(advisorObj);
}

/**
 * Get multiple advisors from queue
 * @param {*} data a list of advisor id
 * @returns a list that contains advisors' object
 */
export function getAdvisorQueueByIds(data) {
    const idList = data['id'];
    const queue = read();
    const selectedList = [];

    for (var i = 0; i < idList.length; i++) {
        const advisorQueue = queue[findAdvisorByObjIndex(queue, idList[i])];
        if (advisorQueue) {
            selectedList.push(advisorQueue);
        }
    } 

    return selectedList;
}

/**
 * 
 * @param {*} targetId advisor id
 * @param {*} data student information
 * @returns SUCCESS or FAIL
 */
export function insertStudentByAdvisorId (targetId, data) {
    const queue = read();
    const targetIndex = findAdvisorByObjIndex(queue, parseInt(targetId));
    if (findStudentPositionByAdvisorId(queue, targetIndex, data['username']) !== -1) {
        return { 'message': 'Student already in queue' };
    } 
    if (targetIndex === -1) {
        insertAdvisor(queue, targetId);
        queue[queue.length - 1]['queue'].push(data);
    } else {
        queue[queue.length - 1]['queue'].push(data);
    }
    
    return write(queue);
}

/**
 * 
 * @param {*} targetId advisor id
 * @param {*} data contains student's username and desire position
 * @returns SUCCESS or FAIL
 */
export function adjustStudentPositionByAdvisorId(targetId, data) {
    var queue = read();
    var advisorIndex = findAdvisorByObjIndex(queue,parseInt(targetId));
    var currentPosition = findStudentPositionByAdvisorId(queue,advisorIndex,data['username']);
    var tmp = queue[advisorIndex]['queue'][currentPosition];
    queue[advisorIndex]['queue'].splice(currentPosition,1);
    queue[advisorIndex]['queue'].splice(data['newPosition'] - 1,0,tmp);
    return write(queue);
}

/**
 * 
 * @param {*} targetId advisor id
 * @param {*} data contains student's username
 * @returns SUCCESS or FAIL
 */
export function deleteStudentByAdvisorId(targetId, data) {
    const queue = read();
    const advisorIndex = findAdvisorByObjIndex(queue, parseInt(targetId));
    const currentPosition = findStudentPositionByAdvisorId(queue, advisorIndex, data['username']);
    const checkInTime = queue[advisorIndex]['queue'][currentPosition]['timeIn'];
    
    queue[advisorIndex]['queue'].splice(currentPosition, 1); 
    write(queue);
    
    const sql = 'UPDATE registration SET check_out_time = ? WHERE check_in_time = ?';
    const sqlParam = [timeUtil.getTimeStamp(new Date()),timeUtil.getTimeStamp(new Date(checkInTime))];

    try {
       return update(sql,sqlParam);
    } catch(err) {
        console.log(err);
    }
}