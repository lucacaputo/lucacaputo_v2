const months = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec",
];

export const getDateRange = (d1: Date, d2: Date): string => {
    let s1 = `${d1.getDate()} ${months[d1.getMonth()]} ${d1.getFullYear()}`;
    let s2 = d2 ? `${d2.getDate()} ${months[d2.getMonth()]} ${d2.getFullYear()}` : "now";
    return `${s1} - ${s2}`;
}