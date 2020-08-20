import { TimeEvent } from "./Timeline";

export const events: Array<TimeEvent> = [
    {
        from: new Date("2011-09-10"),
        to: new Date("2016-06-08"),
        description: "High School degree at Liceo Scientifico Paolo Giovio, Como - indirizzo Scienze Applicate",
    },
    {
        from: new Date("2016-09-01"),
        description: "Computer Science Student at \"Università degli Studi di Milano (unimi)\""
    },
    {
        from: new Date("2018-01-01"),
        description: "Full stack developer at D@M Damsol",
        notes: "Stack: HTML5, CSS3, JS (ES 2015+), PHP(5.4+), MYSQL",
    }
];