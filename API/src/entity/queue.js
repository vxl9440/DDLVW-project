import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { update } from '../database/crud.js';

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
 * insert a advisor in the queue if they aren't already added
 * @param {*} queue queue object
 * @param {*} advisorId advisor id
 */
function insertAdvisor(queue, advisorId) {
    if (queue[advisorId] === undefined) {
        queue[advisorId] = [];
    }
}

/**
 * Get multiple advisors from queue
 * @param {*} data a list of advisor id
 * @returns a list that contains advisors' object
 */
export function getAdvisorQueueByIds(data) {
    const idList = data['id'];
    const queue = read();
    const selectedList = {};

    for (const i in idList) {
        const advisorId = idList[i];
        selectedList[advisorId] = queue[advisorId];
    } 

    return selectedList;
}

/**
 * 
 * @param {*} targetId advisor id
 * @param {*} data student information
 * @returns SUCCESS or FAIL
 */
export function insertStudentByAdvisorId(advisorId, data) {
    const queue = read();
    const advisorQueue = queue[advisorId];

    if (advisorQueue !== undefined && Array.isArray(advisorQueue)) {
        if (data['appointment']) {
            const appointment = {
                'startTime': data['startTime'],
                'endTime': data['endTime']
            }

            advisorQueue.push({
                'studentName': data['studentName'],
                'username': data['username'],
                'timeIn': data['timeIn'],
                'appointment': appointment
            });
        } else {
            advisorQueue.push({
                'studentName': data['studentName'],
                'username': data['username'],
                'timeIn': data['timeIn']
            });
        }
    }

    return write(queue);
}

/**
 * 
 * @param {*} targetId advisor id
 * @param {*} data contains student's username and desired position
 * @returns SUCCESS or FAIL
 */
export function adjustStudentPositionByAdvisorId(advisorId, data) {
    const queue = read();
    const advisorQueue = queue[advisorId];
    
    const from = advisorQueue.findIndex(student => student.username == data['username']);
    const newPos = parseInt(data['newPosition']) - 1;
    
    arrayMove(advisorQueue, from, newPos);

    return write(queue);
}

// moves element from one to index to another in place
function arrayMove(arr, from, to) {
    const element = arr[from];
    arr.splice(from, 1);
    arr.splice(to, 0, element);
}

/**
 * 
 * @param {*} advisorId advisor id
 * @param {*} data contains student's username
 * @returns SUCCESS or FAIL
 */
export async function deleteStudentByAdvisorId(advisorId, data) {
    const queue = read();
    const advisorQueue = queue[advisorId];
    const studentUsername = data['username'];
    
    if (advisorQueue !== undefined && studentUsername !== undefined) {
        const removeIndex = advisorQueue.findIndex(student => student.username == studentUsername);
        if (removeIndex > -1) {
            const timeIn = advisorQueue[removeIndex]['timeIn'];
            advisorQueue.splice(removeIndex, 1);
            try {
                await checkOutStudent(studentUsername, advisorId, timeIn);
                write(queue);
                return { 'status': 'success' };
            } catch(err) {
                return { 'error': err };
            }
        }
    }

    return { 'error': 'Failed to remove student'};
}

function checkOutStudent(studentUsername, advisorId, timeIn) {
    const sql = 'UPDATE registration SET check_out_time = NOW() WHERE check_in_time = STR_TO_DATE(?, "%Y-%m-%dT%TZ") AND advisor_id = ? AND student_username = ?';
    const sqlParam = [timeIn, advisorId, studentUsername];

    return update(sql, sqlParam);
}