const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let timeUp = false;
let score = 0;

let lastHole;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add("up")
    setTimeout(() => {
        hole.classList.remove("up");
        if (!timeUp) {
            peep();
        }

    }, time)
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    peep();
    setTimeout(() => {
        timeup = true;
    }, 10000)
    score = 0;
}

function bonk(e) {
    if (!e.isTrusted) {
        alert("Cheater!")
        return;
    }
    score++;
    console.log(this);
    this.parentNode.classList.remove("up");
    scoreBoard.textContent = score


}

moles.forEach((mole) => {
    mole.addEventListener("click", bonk)
})