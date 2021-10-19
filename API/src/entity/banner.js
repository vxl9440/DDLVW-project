import fs from 'fs';

const fileLocation = '../../banner.txt';

function read() {
    return fs.readFileSync(fileLocation).toString(); 
}

function write(content) {
    try {
        fs.writeFileSync(fileLocation, content)
    } catch (err) {
        return false;
    }
    return true;
}


export function getBannerInfo() {
    return {
        "bannerInfo": read()
    }
}

export function insertBannerInfo(content) {
    const returnData = {"message": 'Fail'};
    if (write(content['bannerInfo'])) {
        returnData['message'] = 'Success';
    }

    return returnData;
}

export function updateBannerInfo(content) {
    const returnData = {"message": 'Fail'};
    if (write(content['bannerInfo'])) {
        returnData['message'] = 'Success';
    }

    return returnData;
}

export function deleteBannerInfo() {
    const returnData = {"message": 'Fail'};
    if (write('')) {
        returnData['message'] = 'Success';
    }
    
    return returnData;
}