
var weekdayMapper = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
    7: 'Sun'
};


exports.getCurrentWeekDay = function(){
    return weekdayMapper[new Date().getDay()];
}

exports.getCurrentTime = function(){
    var d = new Date();
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

exports.getCurrentDay = function (plusOne) {
    var d = new Date();
    if(plusOne){
        d.setDate(d.getDate() + 1);
    }
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}


exports.getTimeStamp = function (d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} `+
           `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}