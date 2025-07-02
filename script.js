const clock_el = document.getElementById("clock");
const start_el = document.getElementById("start");
const pause_el = document.getElementById("pause");
const reset_el = document.getElementById("reset");

let intervalId = null;
let elapsed_time = 0;
let start_time = 0;

function time_format(ms) {
    let sec = ms / 1000;
    let hr = 0;
    let min = 0;
    if (sec < 10) {
        return "00:00:0" + parseInt(sec);
    } else if (sec < 60) {
        return "00:00:" + parseInt(sec);
    } else {
        min = parseInt(sec / 60);
        if (min < 60) {
            sec = parseInt(sec - (min * 60));
            min = min < 10 ? "0"+ min : min;
            sec = sec < 10 ? "0"+ sec : sec;
            return "00:" + min + ":" + sec;
        } else {
            hr = parseInt(min / 60);
            min = parseInt(min - (hr * 60));
            sec = parseInt(sec - (min * 60));
            min = min < 10 ? "0"+ min : min;
            sec = sec < 10 ? "0"+ sec : sec;
            hr = hr < 10 ? "0"+ hr : hr;
            return "" + hr + ":" + min + ":" + sec;
        }
    }
}

function start_handler() {
    start_el.disabled = true;
    pause_el.disabled = false;
    start_time = Date.now() - elapsed_time;
    intervalId ??= setInterval(() => {
        elapsed_time = Date.now() - start_time;
        clock_el.textContent = time_format(elapsed_time);
    }, 1000);
}

function pause_handler() {
    clearInterval(intervalId);
    start_el.disabled = false;
    pause_el.disabled = true;
    intervalId = null;
}

function reset_handler(){
    clearInterval(intervalId);
    clock_el.textContent = "00:00:00";
    elapsed_time = 0;
    start_el.disabled = false;
    pause_el.disabled = false;
    intervalId = null;
}

start_el.addEventListener("click", start_handler);
reset_el.addEventListener("click", reset_handler);
pause_el.addEventListener("click", pause_handler);