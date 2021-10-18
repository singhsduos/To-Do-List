const day = document.querySelector(".day");
const months = document.querySelector(".month");
const year = document.querySelector(".year");
const weeks = document.querySelector(".weekDay");

const dialogBox = document.getElementById("dialogBox");
const span = document.getElementsByClassName("close")[0];
const opentodoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const addNewtodoBtn = document.querySelector(".addNewtodo-btn");


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

// Event listener
opentodoBtn.addEventListener("click", openForm);
span.addEventListener('click', closeForm);
window.addEventListener("click", closeFormOutside);
addNewtodoBtn.addEventListener("click", addNewItem);



// Functions

// When the user clicks the button, open the dialogBox 
function openForm() {
    dialogBox.style.display = "block";
}

// When the user clicks on <span> (x), close the dialogBox
function closeForm() {
    dialogBox.style.display = "none";
}

// When the user clicks anywhere outside of the dialogBox, close it
function closeFormOutside(event){
    if (event.target == dialogBox) {
        dialogBox.style.display = "none";
    }
}

// Add new item in your to-do list
function addNewItem(event) {
    // preventform submiting
    event.preventDefault();
    console.log("hello");
}
