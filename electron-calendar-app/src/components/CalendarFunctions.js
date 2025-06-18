export function getCurrentMonth() {
    const date = new Date();
    return date.getMonth();
}

export function getCurrentYear() {
    const date = new Date();
    return date.getFullYear();
}

export function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

export function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}