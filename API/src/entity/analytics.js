import { select } from '../database/crud.js';
import { getTimeStamp } from '../util/timeUtil.js';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v1 } from 'uuid';

const __dirname = fileURLToPath(import.meta.url);
const filePath = path.resolve(__dirname, '../../../');


/**
 * @param {*} from start date
 * @param {*} to end date
 * @returns records of registration of DB
 */
function getRecords(from, to) {
    const sql = `SELECT reg.registration_id AS 'registrationId', CONCAT(ad.first_name,' ',ad.last_name) AS advisorName, 
    reg.check_in_time AS checkinTime, reg.check_out_time AS checkoutTime, 
    reg.scheduled AS scheduled, reg.student_username AS studentUsername, 
    reg.student_name AS studentName, re.reason_name AS reason 
    FROM registration reg INNER JOIN advisor ad 
    ON reg.advisor_id = ad.advisor_id AND (reg.check_in_time BETWEEN ? AND ?) 
    LEFT JOIN registration_reason_assoc rra 
    ON reg.registration_id = rra.registration_id 
    LEFT JOIN reason re 
    ON rra.reason_id = re.reason_id 
    ORDER BY reg.registration_id;`;
    
    return select(sql, [from+' 00:00:00',to+' 23:59:59']);
}

/**
 * 
 * @param {*} record a row of registration 
 * @returns a line with csv format
 */
function constructLine(record){
   var line = `${record['registrationId']},`;
   line += `${record['advisorName']},`;
   line += `${getTimeStamp(record['checkinTime'])},`;
   line += `${getTimeStamp(record['checkoutTime'])},`;
   line += `${record['scheduled']},`;
   line += `${record['studentUsername']},`;
   line += `${record['studentName']},`;
   if(record['scheduled'] === 1){
       line += `${record['reason']}`;
   }
   return line;
}

/**
 * 
 * @param {*} content csv file content
 * @returns an object contains file locatiion
 */
function createFile(content) {
    const fileLocation = path.resolve(__dirname, '../../../'+v1()+'.csv');
    try {
        writeFileSync(fileLocation, content)
    } catch (err) {
        return {
            'status' : -1
        };
    }
    return {
       'status': 1,
       'fileLocation': fileLocation 
    };
}

/**
 * 
 * @param {*} data contains from and to
 * @returns a csv file
 */
export async function constructFile(data) {
   const records = await getRecords(data['from'],data['to']);
//    return an empty object if records is empty
   if (records.length === 0) return {};
   var flag = records[0]['registrationId'];
   var content = '';
   var line = constructLine(records[0]);
   for(var i = 1;i < records.length;i++) {
       if (flag === records[i]['registrationId']) {
           line += `,${records[i]['reason']}`;
       } else {
           flag = records[i]['registrationId'];
           content += line + '\r\n';
           line = constructLine(records[i]);
       }  
   }
   content += line;
   return createFile(content);
}
