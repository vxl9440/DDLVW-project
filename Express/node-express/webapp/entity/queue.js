const { log } = require('console');
const fs = require('fs');
const fileLocation = 'C:\\Users\\miaox\\Desktop\\500-node\\queue.json';


function read(){
    return JSON.parse(fs.readFileSync(fileLocation));
}

function write(queue){
    var returnData = {
        "message": "Success"
    };
    try {
        const data = fs.writeFileSync(fileLocation, JSON.stringify(queue));
    } catch (err) {
        returnData['message'] = 'Fail';
        return returnData;
    }
    return returnData;
}

function findAdvisorByObjIndex(queue,advisorId){
    for(var i = 0;i < queue.length;i++){
        if(queue[i]['meetingHost'] === advisorId){
            return i;
        }
    }
    return -1;
}

function findStudentPositionByAdvisorId(queue,advisorIndex,studentUsername){
    for(var k = 0;k < queue[advisorIndex]['queue'].length;k++){
        if(queue[advisorIndex]['queue'][k]['username'] === studentUsername){
            return k;
        }
    }
    return -1;
}

function insertAdvisor(queue,advisorId){
    var advisorObj = {
        "meetingHost": advisorId,
        "queue":[]
    }
    queue.push(advisorObj);
}

exports.getAdvisorQueueByIds = function (data) {
    var idList = data['id'];
    var queue = read();
    var selectedList = [];
    for(var i = 0;i < idList.length;i++){
        selectedList.push(queue[findAdvisorByObjIndex(queue,idList[i])]); 
    } 
    return selectedList;
}

exports.insertStudentByAdvisorId = function (targetId,data) {
    var queue = read();
    var targetIndex = findAdvisorByObjIndex(queue,parseInt(targetId));
    if(targetIndex === -1){
        insertAdvisor(queue,targetId);
    }
    queue[queue.length - 1]['queue'].push(data);
    return write(queue);
}

exports.adjustStudentPositionByAdvisorId = function(targetId,data){
    var queue = read();
    var advisorIndex = findAdvisorByObjIndex(queue,parseInt(targetId));
    var currentPosition = findStudentPositionByAdvisorId(queue,advisorIndex,data['username']);
    var tmp = queue[advisorIndex]['queue'][currentPosition];
    queue[advisorIndex]['queue'].splice(currentPosition,1);
    queue[advisorIndex]['queue'].splice(data['desirePosition'] - 1,0,tmp);
    return write(queue);
}

exports.deleteStudentByAdvisorId = function (targetId,data) {
    var queue = read();
    var advisorIndex = findAdvisorByObjIndex(queue,parseInt(targetId));
    var currentPosition = findStudentPositionByAdvisorId(queue,advisorIndex,data['username']);
    queue[advisorIndex]['queue'].splice(currentPosition,1);
    return write(queue);
}
