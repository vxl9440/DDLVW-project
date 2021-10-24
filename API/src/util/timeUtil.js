
const weekdayMapper = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat'
};


export function getCurrentWeekDay() {
    return weekdayMapper[new Date().getDay()];
}

export function getCurrentTime() {
    const d = new Date();
    return `${ d.getHours() }:${ d.getMinutes() }:${ d.getSeconds() }`;
}

export function getCurrentDay (plusOne) {
    const d = new Date();
    if (plusOne) {
        d.setDate(d.getDate() + 1);
    }

    return `${ d.getFullYear() }-${ d.getMonth() + 1 }-${ d.getDate() }`;
}


export function getTimeStamp(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} `+
           `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}