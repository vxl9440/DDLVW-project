const fs = require('fs');
const fileLocation = 'C:\\Users\\miaox\\Desktop\\500-node\\banner';

function read(){
    return fs.readFileSync(fileLocation).toString(); 
}

function write(content){
    try {
        const data = fs.writeFileSync(fileLocation, content)
    } catch (err) {
        return false;
    }
    return true;
}


exports.getBannerInfo = function () {
    return {
        "bannerInfo": read()
    };
}

exports.InsertBannerInfo = function (content) {
    var returnData = {"message": 'Fail'};
    if(write(content['bannerInfo'])){
        returnData['message'] = 'Success';
    }
    return returnData;
}

exports.updateBannerInfo = function (content) {
    var returnData = {"message": 'Fail'};
    if(write(content['bannerInfo'])){
        returnData['message'] = 'Success';
    }
    return returnData;
}

exports.deleteBannerInfo = function () {
    var returnData = {"message": 'Fail'};
    if(write('')){
        returnData['message'] = 'Success';
    }
    return returnData;
}