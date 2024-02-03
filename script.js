let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer");
let int = null;
let storedTimes = [];

document.getElementById("start-timer").addEventListener("click",
() => {
    if(int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);

});

document.getElementById("pause-timer").addEventListener("click",
() => {
    clearInterval(int);
    storeTime();
});

document.getElementById("reset-timer").addEventListener("click",
() => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00 : 00 : 00 : 000";
});

document.getElementById("delete-all-btn").addEventListener("click", () => {
    storedTimes = []; // Clear the array to delete all recorded times
    displayStoredTimes();
});

function displayTimer() {
    milliseconds += 10; 
    if(milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if(seconds == 60) {
            seconds = 0;
            minutes++;
            if(minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = 
    milliseconds < 10 
    ? "00" + milliseconds
    : milliseconds < 100
    ? "0" + milliseconds
    : milliseconds;

    timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}

function storeTime() {
    let currentTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    storedTimes.push(currentTime);
    if (storedTimes.length > 10) {
        storedTimes.shift(); 
    }
    displayStoredTimes();
}

function deleteTime(index) {
    storedTimes.splice(index, 1);
    displayStoredTimes();
}

function displayStoredTimes() {
    let timesList = document.getElementById('times-list');
    timesList.innerHTML = ""; // Clear previous entries

    storedTimes.forEach((time, index) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${time}</span>
            <button onclick="deleteTime(${index})">Delete</button>
        `;
        timesList.appendChild(listItem);
    });

    let deleteAllBtn = document.getElementById('delete-all-btn');
    deleteAllBtn.style.display = storedTimes.length > 0 ? 'block' : 'none';
}

// Responsive Design using media queries
window.addEventListener('resize', adjustLayout);

function adjustLayout() {
    let container = document.querySelector('.container');
    if (window.innerWidth <= 500) {
        container.style.width = '90%';
    } else {
        container.style.width = '48%';
    }
}
