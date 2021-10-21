const fs = require('fs');
const msgUtil = require('../util/messageUtil');
const fileLocation = 'C:\\Users\\miaox\\Desktop\\500-node\\banner';

/**
 * 
 * @returns string content of the file
 */
function read(){
    return fs.readFileSync(fileLocation).toString(); 
}

/**
 * 
 * @param {*} content new content that to be wrote into DB
 * @returns true or false, true for success false for fail
 */
function write(content){
    try {
        const data = fs.writeFileSync(fileLocation, content)
    } catch (err) {
        return msgUtil.getFailDataSet();
    }
    return msgUtil.getSuccessDataSet();
}

/**
 * 
 * @returns banner information
 */
exports.getBannerInfo = function () {
    return {
        "bannerInfo": read()
    };
}

/**
 * 
 * @param {*} content insert new banner information
 * @returns SUCCESS or FAIL
 */
exports.InsertBannerInfo = function (content) {
    return write(content['bannerInfo']);
}

/**
 * 
 * @param {*} content the content of banner that to be updated
 * @returns SUCCESS or FAIL
 */
exports.updateBannerInfo = function (content) {
    return write(content['bannerInfo']);
}

/**
 * delete banner 
 * @returns SUCCESS or FAIL
 */
exports.deleteBannerInfo = function () {
    return write('');
}