const { log } = require('console');
const fs = require('fs');
const crud = require('../database/crud');
const timeUtil = require('../util/timeUtil');
const msgUtil = require('../util/messageUtil');
const fileLocation = 'C:\\Users\\miaox\\Desktop\\500-node\\queue.json';

/**
 * 
 * @returns string content of a file
 */
function read(){
    return JSON.parse(fs.readFileSync(fileLocation));
}


/**
 * 
 * @param {*} queue queue object
 * @returns SUCCESS or FAIL
 */
function write(queue){
    try {
        const data = fs.writeFileSync(fileLocation, JSON.stringify(queue));
    } catch (err) {
        return msgUtil.getFailDataSet();
    }
    return msgUtil.getSuccessDataSet();
}

/**
 * 
 * @param {*} queue queue object
 * @param {*} advisorId advisor id
 * @returns index of targeted advisor in queue list
 */
function findAdvisorByObjIndex(queue,advisorId){
    for(var i = 0;i < queue.length;i++){
        if(queue[i]['meetingHost'] === advisorId){
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
function findStudentPositionByAdvisorId(queue,advisorIndex,studentUsername){
    for(var k = 0;k < queue[advisorIndex]['queue'].length;k++){
        if(queue[advisorIndex]['queue'][k]['username'] === studentUsername){
            return k;
        }
    }
    return -1;
}

/**
 * insert a advisor in the queue
 * @param {*} queue queue object
 * @param {*} advisorId advisor id
 */
function insertAdvisor(queue,advisorId){
    var advisorObj = {
        "meetingHost": advisorId,
        "queue":[]
    }
    queue.push(advisorObj);
}

/**
 * Get multiple advisors from queue
 * @param {*} data a list of advisor id
 * @returns a list that contains advisors' object
 */
exports.getAdvisorQueueByIds = function (data) {
    var idList = data['id'];
    var queue = read();
    var selectedList = [];
    for(var i = 0;i < idList.length;i++){
        selectedList.push(queue[findAdvisorByObjIndex(queue,idList[i])]); 
    } 
    return selectedList;
}

/**
 * 
 * @param {*} targetId advisor id
 * @param {*} data student information
 * @returns SUCCESS or FAIL
 */
exports.insertStudentByAdvisorId = function (targetId,data) {
    var queue = read();
    var targetIndex = findAdvisorByObjIndex(queue,parseInt(targetId));
    if(findStudentPositionByAdvisorId(queue,targetIndex,data['username']) !== -1){
        return {'message':'Student already in queue'};
    } 
    if(targetIndex === -1){
        insertAdvisor(queue,targetId);
        queue[queue.length - 1]['queue'].push(data);
    }else{
        queue[targetIndex]['queue'].push(data);
    }
    return write(queue);
}

/**
 * 
 * @param {*} targetId advisor id
 * @param {*} data contains student's username and desire position
 * @returns SUCCESS or FAIL
 */
exports.adjustStudentPositionByAdvisorId = function(targetId,data){
    var queue = read();
    var advisorIndex = findAdvisorByObjIndex(queue,parseInt(targetId));
    var currentPosition = findStudentPositionByAdvisorId(queue,advisorIndex,data['username']);
    var tmp = queue[advisorIndex]['queue'][currentPosition];
    queue[advisorIndex]['queue'].splice(currentPosition,1);
    queue[advisorIndex]['queue'].splice(data['desirePosition'] - 1,0,tmp);
    return write(queue);
}

/**
 * 
 * @param {*} targetId advisor id
 * @param {*} data contains student's username
 * @returns SUCCESS or FAIL
 */
exports.deleteStudentByAdvisorId = async function (targetId,data) {
    var queue = read();
    var advisorIndex = findAdvisorByObjIndex(queue,parseInt(targetId));
    var currentPosition = findStudentPositionByAdvisorId(queue,advisorIndex,data['username']);
    var checkInTime = queue[advisorIndex]['queue'][currentPosition]['timeIn'];
    queue[advisorIndex]['queue'].splice(currentPosition,1); 
    write(queue);
    var sql = 'UPDATE registration SET check_out_time = ? WHERE check_in_time = ?';
    var sqlParam = [timeUtil.getTimeStamp(new Date()),timeUtil.getTimeStamp(new Date(checkInTime))];
    var t;
    try{
       t = await crud.update(sql,sqlParam);
    }catch(err){
        console.log(err);
        return t;
    }
    return t;
}
