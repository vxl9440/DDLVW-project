import { readFileSync, writeFileSync } from 'fs';
const fileLocation = '../../queue.json';


function read() {
    return JSON.parse(readFileSync(fileLocation));
}

function write(queue) {
    const returnData = {
        "message": "Success"
    };

    try {
        writeFileSync(fileLocation, JSON.stringify(queue));
    } catch (err) {
        returnData['message'] = 'Fail';
        return returnData;
    }

    return returnData;
}

function findAdvisorByObjIndex(queue, advisorId) {
    for (var i = 0; i < queue.length; i++) {
        if (queue[i]['meetingHost'] === advisorId) {
            return i;
        }
    }

    return -1;
}

function findStudentPositionByAdvisorId(queue,advisorIndex,studentUsername){
    for (var k = 0; k < queue[advisorIndex]['queue'].length; k++) {
        if(queue[advisorIndex]['queue'][k]['username'] === studentUsername) {
            return k;
        }
    }

    return -1;
}

function insertAdvisor(queue,advisorId) {
    var advisorObj = {
        "meetingHost": advisorId,
        "queue":[]
    }
    queue.push(advisorObj);
}

export function getAdvisorQueueByIds(data) {
    var idList = data['id'];
    var queue = read();
    var selectedList = [];
    for(var i = 0;i < idList.length;i++){
        selectedList.push(queue[findAdvisorByObjIndex(queue, idList[i])]); 
    } 
    return selectedList;
}

export function insertStudentByAdvisorId (targetId,data) {
    var queue = read();
    var targetIndex = findAdvisorByObjIndex(queue,parseInt(targetId));
    if(targetIndex === -1){
        insertAdvisor(queue,targetId);
    }
    queue[queue.length - 1]['queue'].push(data);
    return write(queue);
}

export function adjustStudentPositionByAdvisorId(targetId,data){
    var queue = read();
    var advisorIndex = findAdvisorByObjIndex(queue,parseInt(targetId));
    var currentPosition = findStudentPositionByAdvisorId(queue,advisorIndex,data['username']);
    var tmp = queue[advisorIndex]['queue'][currentPosition];
    queue[advisorIndex]['queue'].splice(currentPosition,1);
    queue[advisorIndex]['queue'].splice(data['desirePosition'] - 1,0,tmp);
    return write(queue);
}

export function deleteStudentByAdvisorId(targetId, data) {
    const queue = read();
    const advisorIndex = findAdvisorByObjIndex(queue, parseInt(targetId));
    const currentPosition = findStudentPositionByAdvisorId(queue, advisorIndex, data['username']);
    
    queue[advisorIndex]['queue'].splice(currentPosition,1);
    
    return write(queue);
}
