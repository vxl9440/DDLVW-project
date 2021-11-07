import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(import.meta.url);
const fileLocation = path.resolve(__dirname, '../../../banner.txt');

/**
 * 
 * @returns string content of the file
 */
function read() {
    return readFileSync(fileLocation).toString(); 
}


/**
 * 
 * @param {*} content new content that to be wrote into DB
 * @returns true or false, true for success false for fail
 */
function write(content) {
    try {
        writeFileSync(fileLocation, content)
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
    const returnData = { 'message': 'Fail' };
    if (write(content['bannerInfo'])) {
        returnData['message'] = 'Success';
    }

    return returnData;
}

/**
 * @param {*} file file to be stored
 * @returns json message indicate success or fail
 */
export function storeFile(files) {
    if (files) {
        const token = files.bannerFile.name.split('.');
        const fileExtension = token[token.length - 1];
        // file name like banner.jpg, banner.png
        const bannerImageLocation = path.resolve(__dirname, `../../../banner.${fileExtension}`);
        files.bannerFile.mv(bannerImageLocation);
        return {message:"SUCCESS",statusCode:1}
    } else {
        return {message:"FAIL: No file uploaded",statusCode:-1};
    }
}
