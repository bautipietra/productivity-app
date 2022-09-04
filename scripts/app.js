// Mute function

let soundStatus = true;
const soundButton = document.querySelector("#sound");
const muteButton = document.querySelector("#mute");
soundButton.addEventListener("click", sound);
muteButton.addEventListener("click", sound);
soundButton.style.display = "inline";
muteButton.style.display = "none";

function sound() {
    if (muteButton.style.display === "none") {
        soundButton.style.display = "none";
        muteButton.style.display = "inline";
        soundStatus = false;
    }
    else {
        soundButton.style.display = "inline";
        muteButton.style.display = "none";
        soundStatus = true;
    }
};

// Info modal function

let infoOpen = document.querySelector("#info")
let infoClose = document.querySelector("#infoClose")
let infoModal = document.querySelector(".infoBackground")
infoOpen.addEventListener("click", showInfo)
infoClose.addEventListener("click", closeInfo)

function showInfo() {
    infoModal.style.display = "block"
}

function closeInfo() {
    infoModal.style.display = "none"
}

// Pomodoro function

const finish = document.querySelector('audio');
const startButton = document.querySelector("#submit")
const stopButton = document.querySelector("#stop")
stopButton.style.display = "none";
startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
const timerText = document.querySelector("#timer")
timerText.style.display = "none";
let timeInput = ""
let time = ""

function start() {
    timeInput = document.querySelector("#time").value;
    time = timeInput * 60;
    stopButton.style.display = "block";
    startButton.style.display = "none";
    const timer = setInterval(() => {
        time--;
        document.querySelector("#time").style.display = "none"
        timerText.style.display = "block";
        var m = Math.floor(time / 60);
        var s = Math.floor((time * 60) % 3600 / 60);
        if (s < 10) {
            let total = `${m}:0${s}`
            timerText.textContent = total
        }
        else {
            let total = `${m}:${s}`
            timerText.textContent = total
        }
        if (time === 0) {
            clearInterval(timer)
            stopButton.style.display = "none";
            startButton.style.display = "block";
            document.querySelector("#time").style.display = "block"
            timerText.style.display = "none";
            if (soundStatus === true) finish.play()
        }
        if (time < 0) {
            time = 1
        }
    }, 1000)
}

function stop() {
    time = 1
}

// New Task function

const taskInput = document.querySelector("#taskInput")
const taskList = document.querySelector(".todoItems")
const taskSubmit = document.querySelector("#taskSubmit")
taskSubmit.addEventListener("click", newTask)

function newTask() {
    if (taskInput.value !== "") {
        let taskContainer = document.createElement("div")
        taskContainer.classList.add("itemContainer")
        let task = document.createElement("p")
        task.classList.add("item")
        task.textContent = taskInput.value
        taskList.appendChild(taskContainer)
        taskContainer.appendChild(task)
        let closeTask = document.createElement("p")
        closeTask.classList.add("closeTask")
        taskContainer.appendChild(closeTask)
        closeTask.textContent = "❌"
        // Delete task function
        closeTask.addEventListener("click", deleteTask)
        function deleteTask() {
        task.style.display = "none"
        closeTask.style.display = "none"
        }
    }
}

// Drag task function

let left = document.querySelector(".left")
let mid = document.querySelector(".mid")
let right = document.querySelector(".right")

new Sortable(left, {
    group: 'todo',
    animation: 200
});

new Sortable(mid, {
    group: 'todo',
    animation: 200
});

new Sortable(right, {
    group: 'todo',
    animation: 200
});
