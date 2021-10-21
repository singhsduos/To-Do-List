const day = document.querySelector(".day");
const months = document.querySelector(".month");
const year = document.querySelector(".year");
const weeks = document.querySelector(".weekDay");

const dialogBox = document.getElementById("dialogBox");
const span = document.getElementsByClassName("close")[0];
const opentodoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const addNewtodoBtn = document.querySelector(".addNewtodo-btn");
const heading = document.getElementById("heading");
const description = document.getElementById("desc");
const todoFilter = document.querySelector("#todoFilter");

const body = document.querySelector("body");
const lowerDiv = document.querySelector(".lowerDiv");
const insideConti = document.querySelector(".inside-conti");


// Set Date, Month and WeekDayName

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



// Event listener
document.addEventListener('DOMContentLoaded', getToDos);
opentodoBtn.addEventListener("click", openForm);
span.addEventListener('click', closeForm);
window.addEventListener("click", closeFormOutside);
addNewtodoBtn.addEventListener("click", addNewItem);
todoList.addEventListener('click', checkDelete);
todoFilter.addEventListener('click', filterOption);


// Functions    

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

// When the user clicks the button, open the dialogBox 
function openForm() {
    dialogBox.style.display = "block";
}

// When the user clicks on <span> (x), close the dialogBox
function closeForm() {
    dialogBox.style.display = "none";
}

// When the user clicks anywhere outside of the dialogBox, close it
function closeFormOutside(event) {
    if (event.target == dialogBox) {
        dialogBox.style.display = "none";
    }
}




// Add new item in your to-do list
function addNewItem(event) {
    // preventform submiting
    event.preventDefault();

    // DIV TODO - LIST
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");

    // DIV FOR HEADING AND SIDEBAR
    const sidebarAndheadingDiv = document.createElement("div");
    sidebarAndheadingDiv.classList.add("sidebarAndheading");

    // DIV SIDEBAR
    const sidebarDiv = document.createElement("div");
    sidebarDiv.classList.add("sidebar");
    sidebarAndheadingDiv.appendChild(sidebarDiv);

    // DIV FOR SUBJECT AND DESCRIPTION
    const makeListDiv = document.createElement("div");
    makeListDiv.classList.add("make-list");

    // H2 FOR HEADING
    const subjectHeading = document.createElement("h2");
    subjectHeading.innerText = heading.value;
    subjectHeading.classList.add("subject");
    makeListDiv.appendChild(subjectHeading);

    // H5 FOR DESCRIPTION
    const descriptionHeading = document.createElement("h5");
    descriptionHeading.innerText = description.value;
    descriptionHeading.classList.add("description");
    makeListDiv.appendChild(descriptionHeading);


    // saving in local storage
    saveLocalTodos(heading.value, description.value);


    // if user didn't give input in any of the field then return from here
    if (heading.value === "" || description.value === "") {
        alert("Please give heading and description");
        return;
    }

    // Add makelist under sidebarAndheadingDiv
    sidebarAndheadingDiv.appendChild(makeListDiv);

    // DIV FOR BUTTONS
    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("btns");

    // DIV FOR BTN-1
    const btnDiv1 = document.createElement("div");
    btnDiv1.classList.add("btn-div1");
    // Event Listener for btn-1 (check-button)
    btnDiv1.addEventListener("mouseover", btn1mouseOver);
    btnDiv1.addEventListener("mouseout", btn1mouseOut);

    // a FOR BTN-1
    const completedButton = document.createElement("a");
    completedButton.style.fontSize = "1 rem";
    const iCheck = document.createElement("i");
    iCheck.classList.add("fas", "fa-check");
    completedButton.appendChild(iCheck);
    btnDiv1.appendChild(completedButton);
    btnsDiv.appendChild(btnDiv1);

    // function for changing color of btn-1 on hover
    function btn1mouseOver() {
        iCheck.style.color = "white";
    }

    function btn1mouseOut() {
        iCheck.style.color = "#03045e";
    }


    // DIV FOR BTN-2
    const btnDiv2 = document.createElement("div");
    btnDiv2.classList.add("btn-div2");
    // Event Listener for btn-2 (delete-button)
    btnDiv2.addEventListener("mouseover", btn2mouseOver);
    btnDiv2.addEventListener("mouseout", btn2mouseOut);

    // a FOR BTN-2
    const deleteButton = document.createElement("a");
    deleteButton.style.fontSize = "1 rem";
    const iTrash = document.createElement("i");
    iTrash.classList.add("fas", "fa-trash");
    deleteButton.appendChild(iTrash);
    btnDiv2.appendChild(deleteButton);
    btnsDiv.appendChild(btnDiv2);


    // function for changing color of btn-2 on hover
    function btn2mouseOver() {
        iTrash.style.color = "white";
    }

    function btn2mouseOut() {
        iTrash.style.color = "#03045e";
    }


    // Add sidebarAndheadingDiv under todoDiv
    toDoDiv.appendChild(sidebarAndheadingDiv);
    toDoDiv.appendChild(btnsDiv);
    todoList.appendChild(toDoDiv);


    // Make fields empty and after submitting form dialog-box auto close
    heading.value = "";
    description.value = "";
    dialogBox.style.display = "none";
    sidebarDiv.style.height = toDoDiv.offsetHeight + 'px';

}



// Mark Complete or Delete Item in ToDo List
function checkDelete(e) {

    const item = e.target;


    // Delete todo-list item one by one
    if (item.classList.value === 'btn-div2') {
        const toDoListDiv = item.parentElement.parentElement;
        // first add animation then delete
        toDoListDiv.classList.add("todoFallDelete");
        removeLocalTodos(toDoListDiv);
        toDoListDiv.addEventListener("transitionend", function () {
            toDoListDiv.remove();
        });
    }

    if (item.classList.value === 'fas fa-trash') {
        const toDoListDiv = item.parentElement.parentElement.parentElement.parentElement;
        // first add animation then delete
        toDoListDiv.classList.add("todoFallDelete");
        removeLocalTodos(toDoListDiv);
        toDoListDiv.addEventListener("transitionend", function () {
            toDoListDiv.remove();
        });
    }


    // Check todo-list item one by one
    if (item.classList.value === 'btn-div1') {
        const toDoListDiv = item.parentElement.parentElement;
        toDoListDiv.classList.toggle('todoCompleted');
    }

    if (item.classList.value === 'fas fa-check') {
        const toDoListDiv = item.parentElement.parentElement.parentElement.parentElement;
        toDoListDiv.classList.toggle('todoCompleted');
    }
}


// Filter out option according to complete,uncomplete and all
function filterOption(e) {
    let todos = todoList.childNodes;
    todos.forEach(function (todo) {
        try {
            switch (String(e.target.value)) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('todoCompleted')) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains('todoCompleted')) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        } catch (err) {
            console.log("You got error");
        }

    })
}


// Adjust height of lower div for new element added in List
const lowerDivHeight = () => {
    if (insideConti.offsetHeight > '366') {
        lowerDiv.style.height = insideConti.offsetHeight + 'px';

    } else if (insideConti.offsetHeight <= '366') {
        lowerDiv.style.height = "21.6875rem";
    }


}

setInterval(lowerDivHeight, 100);

// Save List in Local Storage


function saveLocalTodos(todoHeading, todoDesc) {
    let todos;
    let badaTodo;

    // check if there already have item list in local or not
    if (localStorage.getItem("badaTodo") === null || localStorage.getItem("todos") === null) {
        badaTodo = [];
        todos = [];
    }
    else {
        badaTodo = JSON.parse(localStorage.getItem("badaTodo"));
        todos = JSON.parse(localStorage.getItem("todos"));
    }


    badaTodo.push(todoHeading);
    todos.push(todoDesc);
    localStorage.setItem("badaTodo", JSON.stringify(badaTodo));
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getToDos() {
    let todos;
    let badaTodo;

    // check if there already have item list in local or not
    if (localStorage.getItem("badaTodo") === null || localStorage.getItem("todos") === null) {
        badaTodo = [];
        todos = [];
    }
    else {
        badaTodo = JSON.parse(localStorage.getItem("badaTodo"));
        todos = JSON.parse(localStorage.getItem("todos"));
    }


    let i = 0;
    badaTodo.forEach(function (todoHeading) {
        let count = 0;

        for (; i < todos.length; i++) {
            // DIV TODO - LIST
            count++;
            console.log(count);
            if (count > 1) return;

            const toDoDiv = document.createElement("div");
            toDoDiv.classList.add("todo");

            // DIV FOR HEADING AND SIDEBAR
            const sidebarAndheadingDiv = document.createElement("div");
            sidebarAndheadingDiv.classList.add("sidebarAndheading");

            // DIV SIDEBAR
            const sidebarDiv = document.createElement("div");
            sidebarDiv.classList.add("sidebar");
            sidebarAndheadingDiv.appendChild(sidebarDiv);

            // DIV FOR SUBJECT AND DESCRIPTION
            const makeListDiv = document.createElement("div");
            makeListDiv.classList.add("make-list");

            // H2 FOR HEADING
            const subjectHeading = document.createElement("h2");
            subjectHeading.innerText = todoHeading;
            subjectHeading.classList.add("subject");
            makeListDiv.appendChild(subjectHeading);

            // H5 FOR DESCRIPTION
            const descriptionHeading = document.createElement("h5");
            descriptionHeading.innerText = todos[i];
            descriptionHeading.classList.add("description");
            makeListDiv.appendChild(descriptionHeading);


            // Add makelist under sidebarAndheadingDiv
            sidebarAndheadingDiv.appendChild(makeListDiv);

            // DIV FOR BUTTONS
            const btnsDiv = document.createElement("div");
            btnsDiv.classList.add("btns");

            // DIV FOR BTN-1
            const btnDiv1 = document.createElement("div");
            btnDiv1.classList.add("btn-div1");
            // Event Listener for btn-1 (check-button)
            btnDiv1.addEventListener("mouseover", btn1mouseOver);
            btnDiv1.addEventListener("mouseout", btn1mouseOut);

            // a FOR BTN-1
            const completedButton = document.createElement("a");
            completedButton.style.fontSize = "1 rem";
            const iCheck = document.createElement("i");
            iCheck.classList.add("fas", "fa-check");
            completedButton.appendChild(iCheck);
            btnDiv1.appendChild(completedButton);
            btnsDiv.appendChild(btnDiv1);

            // function for changing color of btn-1 on hover
            function btn1mouseOver() {
                iCheck.style.color = "white";
            }

            function btn1mouseOut() {
                iCheck.style.color = "#03045e";
            }


            // DIV FOR BTN-2
            const btnDiv2 = document.createElement("div");
            btnDiv2.classList.add("btn-div2");
            // Event Listener for btn-2 (delete-button)
            btnDiv2.addEventListener("mouseover", btn2mouseOver);
            btnDiv2.addEventListener("mouseout", btn2mouseOut);

            // a FOR BTN-2
            const deleteButton = document.createElement("a");
            deleteButton.style.fontSize = "1 rem";
            const iTrash = document.createElement("i");
            iTrash.classList.add("fas", "fa-trash");
            deleteButton.appendChild(iTrash);
            btnDiv2.appendChild(deleteButton);
            btnsDiv.appendChild(btnDiv2);


            // function for changing color of btn-2 on hover
            function btn2mouseOver() {
                iTrash.style.color = "white";
            }

            function btn2mouseOut() {
                iTrash.style.color = "#03045e";
            }


            // Add sidebarAndheadingDiv under todoDiv
            toDoDiv.appendChild(sidebarAndheadingDiv);
            toDoDiv.appendChild(btnsDiv);
            todoList.appendChild(toDoDiv);


            // Make fields empty and after submitting form dialog-box auto close
            dialogBox.style.display = "none";
            sidebarDiv.style.height = toDoDiv.offsetHeight + 'px';

        }
    });


}

function removeLocalTodos(todo) {
    let todos;
    let badaTodo;

    // check if there already have item list in local or not
    if (localStorage.getItem("badaTodo") === null || localStorage.getItem("todos") === null) {
        badaTodo = [];
        todos = [];
    }
    else {
        badaTodo = JSON.parse(localStorage.getItem("badaTodo"));
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoHeadingIndex = todo.children[0].children[1].children[0].innerText;
    const todoDescIndex = todo.children[0].children[1].children[0].innerText;

    badaTodo.splice(badaTodo.indexOf(todoHeadingIndex), 1);
    localStorage.setItem('badaTodo', JSON.stringify(badaTodo));

    todos.splice(todos.indexOf(todoDescIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

    console.log(todo.children[0].children[1].children[0].innerText);


}