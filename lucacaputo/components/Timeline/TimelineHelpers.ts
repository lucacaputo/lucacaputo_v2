import { TimeEvent } from "./Timeline";

export const getPercentages = (events: Array<TimeEvent>) => {
    const times = events.map(e => e.to.getTime() - e.from.getTime());
    const totTime = times.reduce((prev, acc) => {
        acc += prev;
        return acc;
    });
    return times.map( el => (el*100)/totTime );
}

export const getStringDate = (d1: Date, d2: Date) => {

}