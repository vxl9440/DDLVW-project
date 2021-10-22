import fs from 'fs';

const fileLocation = '../../banner.txt';

/**
 * 
 * @returns string content of the file
 */
function read() {
    return fs.readFileSync(fileLocation).toString(); 
}


/**
 * 
 * @param {*} content new content that to be wrote into DB
 * @returns true or false, true for success false for fail
 */
function write(content) {
    try {
        fs.writeFileSync(fileLocation, content)
    } catch (err) {
        return false;
    }
    return true;
}


/**
 * 
 * @returns banner information
 */
export function getBannerInfo() {
    return {
        "bannerInfo": read()
    }
}

/**
 * 
 * @param {*} content insert new banner information
 * @returns SUCCESS or FAIL
 */
export function insertBannerInfo(content) {
    const returnData = {"message": 'Fail'};
    if (write(content['bannerInfo'])) {
        returnData['message'] = 'Success';
    }

    return returnData;
}

/**
 * 
 * @param {*} content the content of banner that to be updated
 * @returns SUCCESS or FAIL
 */
export function updateBannerInfo(content) {
    const returnData = {"message": 'Fail'};
    if (write(content['bannerInfo'])) {
        returnData['message'] = 'Success';
    }

    return returnData;
}

/**
 * delete banner 
 * @returns SUCCESS or FAIL
 */
export function deleteBannerInfo() {
    const returnData = {"message": 'Fail'};
    if (write('')) {
        returnData['message'] = 'Success';
    }
    
    return returnData;
}