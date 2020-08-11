import { TimeEvent } from "./Timeline"

const months = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec",
];

export const getPercentages = (events: Array<TimeEvent>) => {
    const times = events.map(e => e.to.getTime() - e.from.getTime());
    const totTime = times.reduce((prev, acc) => {
        acc += prev;
        return acc;
    });
    return times.map( el => (el*100)/totTime );
}

export const getStringDate = (d1: Date, d2: Date) => {
    let str1 = `${d1.getDate()} ${months[d1.getMonth()]} ${d1.getFullYear()}`;
    let str2 = `${d2.getDate()} ${months[d2.getMonth()]} ${d2.getFullYear()}`;
    return `${str1} - ${str2}`;
}