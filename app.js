const day = document.querySelector(".day");
const months = document.querySelector(".month");
const year = document.querySelector(".year");
const weeks = document.querySelector(".weekDay");

const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
// const todoBtn = document.querySelector(".");

let monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let weekDayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

 // calling function every second
setInterval(timeStart, 1000);

// function for getting current time
function timeStart() {
    let currentdate = new Date();
    let dWeek = currentdate.getDay();
    let dNum = currentdate.getDate();
    let dMonth = currentdate.getMonth();
    let dYear = currentdate.getFullYear();

    updateDate(dWeek, dNum, dMonth, dYear);
}


// updating time in HTML Doc file
function updateDate(dWeek, dNum, dMonth, dYear) {

    // adding zero as tenth digit in single-digit time
    function checkNum(data) {
        if (data < 10) {
            data = '0' + data;
        }
        return data;
    }

    // loop for converting weekdays number as weekdays name
    for (let i = 1; i <= weekDayName.length; i++) {
        if (i === dWeek) {
            weeks.innerHTML = weekDayName[i];
        }
    }
    // loop for converting months number as months name
    for (let j = 1; j <= monthsName.length; j++) {
        if (j === dMonth) {
            months.innerHTML = monthsName[j];
        }
    }

    // updating days and time in HTML Doc
    day.innerHTML = checkNum(dNum);
    year.innerHTML = dYear;
}
