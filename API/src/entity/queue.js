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
    try {
        writeFileSync(fileLocation, JSON.stringify(queue, null, 2));
    } catch (err) {
        return 500;
    }

    return 200;
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
export function getAllQueue() {
    return read();
}


/**
 * 
 * @param {*} targetId advisor id
 * @param {*} data student information
 * @returns SUCCESS or FAIL
 */
export function insertStudentByAdvisorId(advisorId, data) {
    // Queue.json must contain at least "{}"
    const queue = read();

    const entry = {
        'studentName': data['studentName'],
        'username': data['username'],
        'timeIn': data['timeIn']
    }

    if (queue[advisorId] == undefined) {
        // need to initalize queue
        queue[advisorId] = [];
    }

    if (queue[advisorId] !== undefined && Array.isArray(queue[advisorId])) {
    
        if (data['appointment']) {
            entry['appointment'] = {
                'startTime': data['startTime'],
                'endTime': data['endTime']
            }
        } 

        if (data['reasons'] && Array.isArray(data['reasons'])) {
            entry['reasons'] = data['reasons'];
        }

        queue[advisorId].push(entry);
        return write(queue);
    }

    return 500;
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
    
    if (Array.isArray(advisorQueue) && studentUsername) {
        const removeIndex = advisorQueue.findIndex(student => student.username === studentUsername);
        if (removeIndex > -1) {
            const timeIn = advisorQueue[removeIndex]['timeIn'];
            advisorQueue.splice(removeIndex, 1);
            try {
                await checkOutStudent(studentUsername, advisorId, timeIn);
               
                return write(queue);
            } catch(err) {
                return 500;
            }
        } else {
            return 404; // couldn't find student
        }
    }

    return 400;
}

function checkOutStudent(studentUsername, advisorId, timeIn) {
    const sql = 'UPDATE registration SET check_out_time = NOW() WHERE check_in_time = STR_TO_DATE(?, "%Y-%m-%dT%TZ") AND advisor_id = ? AND student_username = ?';
    const sqlParam = [timeIn, advisorId, studentUsername];

    return update(sql, sqlParam);
}