// Web Style Function
// Navbar:
const mainNav = document.querySelector('.main-nav');
const toggler = document.querySelector('.toggler');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

toggler.addEventListener('click', () => {
    console.log("clicked");
    nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.1}s`;
        }
    });
});

visualViewport.addEventListener('resize', function () {
    nav.classList.remove('nav-active');
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        }
    });
});

// Welcome Message:
const msgWelcome = document.querySelector('#msg-welcome');
const welcomeBtn = document.querySelector('#close-welcome-msg');

welcomeBtn.addEventListener('click', () => {
    msgWelcome.style.display = "none";
});

// User Profile:
let workoutTitle = "unknown";
let authorName = "unknown";
let userFTP = 180;
let isFTPNaN = false;
let userWeight = 60;
let isWeightNaN = false;
let metric = "kilogram";
let profileIsClosed = false;
let hasCD = false;
let hasWM = false;
let CDPowerHigh = 0.5;
let CDPowerLow = 0;
let WMPowerLow = 0;
let WMPowerHigh = 0.5;
let WMDuration = 1500;
let CDDuration = 1500;

document.querySelector('#workout-title').addEventListener('change', () => {
    workoutTitle = document.querySelector('#workout-title').value;
});

document.querySelector('#author-name').addEventListener('change', () => {
    authorName = document.querySelector('#author-name').value;
});

document.querySelector('#metric').addEventListener('change', () => {
    metric = document.querySelector('#metric').value;
    console.log(metric);
});

document.querySelector('#cyclist-ftp').addEventListener('change', () => {
    if (isNaN(document.querySelector('#cyclist-ftp').value)) {
        alert("Invaild input, please try again.");
        isFTPNaN = false;
        userFTP = 150;
    } else {
        userFTP = document.querySelector('#cyclist-ftp').value;
        console.log(`FTP: ${userFTP}`);
    }

    let p = Math.floor(userFTP * parseInt(document.querySelector("#plan-card-0 .power-percentage").innerText) / 100);
    document.querySelector("#plan-card-0 .power-watt").innerText = p;
    document.querySelector("#plan-card-0 .title-power").innerText = p;
    planCardArray[0].power = p;

    updatePlanCardArray();
    checkWorkoutIsEmpty();
});

document.querySelector('#cyclist-weight').addEventListener('change', () => {
    if (isNaN(document.querySelector('#cyclist-weight').value)) {
        isWeightNaN = true;
        if (isWeightNaN) {
            alert("Invaild input, please try again.");
            isWeightNaN = false;
        }
    } else {
        if (metric === "kilogram") {
            userWeight = document.querySelector('#cyclist-weight').value;
            console.log(`Weight: ${userWeight}`);
        } else if (metric === "pound") {
            userWeight = document.querySelector('#cyclist-weight').value / 2.205;
            console.log(`Weight: ${userWeight}`);
        }
    }
    checkWorkoutIsEmpty();
});

// hide function
const userProfileSession = document.querySelector("#user-profile");
const userInfo = document.querySelector('#user-info');
const userProileBreakLine = document.querySelector("#user-profile .break-line");

// Button Animation
const hideProfileBtn = document.querySelector('.hide-session-btn');
const hideBtnL = document.querySelector('.hide-session-l');
const hideBtnR = document.querySelector('.hide-session-r');

hideProfileBtn.addEventListener('click', () => {
    if (profileIsClosed) {
        hideBtnL.style.transform = "rotate(45deg)";
        hideBtnR.style.transform = "rotate(-45deg)";
        userInfo.style.display = "inline";
        userProileBreakLine.style.marginTop = "2.5rem";
        userProfileSession.style.padding = "1rem 2rem 1rem";
        profileIsClosed = false;
    } else {
        hideBtnL.style.transform = "rotate(-45deg)";
        hideBtnR.style.transform = "rotate(45deg)";
        userInfo.style.display = "none";
        userProileBreakLine.style.marginTop = "1rem";
        userProfileSession.style.padding = ".05rem 2rem 1rem";
        profileIsClosed = true;
    }
});

// Shortcut Buttons
const btnShortcutZ1 = document.querySelector(".btn-shortcut-z1");
const btnShortcutZ2 = document.querySelector(".btn-shortcut-z2");
const btnShortcutZ3 = document.querySelector(".btn-shortcut-z3");
const btnShortcutZ4 = document.querySelector(".btn-shortcut-z4");
const btnShortcutZ5 = document.querySelector(".btn-shortcut-z5");

const btnShortcutWarmup = document.querySelector(".btn-shortcut-warmup");
const btnShortcutColddown = document.querySelector(".btn-shortcut-colddown");
const btnShortcutReset = document.querySelector(".btn-shortcut-reset");

btnShortcutZ1.addEventListener('click', () => {
    updatePlanCardPower(planCardArray[0], 1);
});
btnShortcutZ2.addEventListener('click', () => {
    updatePlanCardPower(planCardArray[0], 2);
});
btnShortcutZ3.addEventListener('click', () => {
    updatePlanCardPower(planCardArray[0], 3);
});
btnShortcutZ4.addEventListener('click', () => {
    updatePlanCardPower(planCardArray[0], 4);
});
btnShortcutZ5.addEventListener('click', () => {
    updatePlanCardPower(planCardArray[0], 5);
});

btnShortcutWarmup.addEventListener('click', () => {
    hasWM = hasWM ? false : true;
    if (hasWM) {
        btnShortcutWarmup.style.backgroundColor = "rgb(219, 114, 44)";
        btnShortcutWarmup.style.color = "white";
    } else {
        btnShortcutWarmup.style.backgroundColor = "white";
        btnShortcutWarmup.style.color = "rgb(61, 61, 61)";
    }
    if (hasWM && hasCD) {
        document.querySelector("#workout-plan-shortcut .btn-shortcut-wm-cd").style.backgroundColor = "rgb(219, 114, 44)";
    } else {
        document.querySelector("#workout-plan-shortcut .btn-shortcut-wm-cd").style.backgroundColor = "white";
    }
    checkWorkoutIsEmpty();
});
btnShortcutColddown.addEventListener('click', () => {
    hasCD = hasCD ? false : true;
    if (hasCD) {
        btnShortcutColddown.style.backgroundColor = "rgb(219, 114, 44)";
        btnShortcutColddown.style.color = "white";
    } else {
        btnShortcutColddown.style.backgroundColor = "white";
        btnShortcutColddown.style.color = "rgb(61, 61, 61)";
    }
    if (hasWM && hasCD) {
        document.querySelector("#workout-plan-shortcut .btn-shortcut-wm-cd").style.backgroundColor = "rgb(219, 114, 44)";
    } else {
        document.querySelector("#workout-plan-shortcut .btn-shortcut-wm-cd").style.backgroundColor = "white";
    }
    checkWorkoutIsEmpty();
});

btnShortcutReset.addEventListener("click", () => {
    while (planCardArray.length !== 1) {
        planCardArray.pop();
    }
    updatePlanCardArray();
    checkWorkoutIsEmpty();
});

let updatePlanCardPower = (card, zone) => {
    const editCardPowerPer = document.querySelector("#plan-card-0 .power-percentage");
    const editCardPowerWatt = document.querySelector("#plan-card-0 .power-watt");
    const editCardTitleZone = document.querySelector("#plan-card-0 .title-zone-level");
    const editCardTitlePower = document.querySelector("#plan-card-0 .title-power");

    let currBgColor = "";

    switch (zone) {
        case 1:
            editCardPowerPer.innerText = 50;
            card.power = Math.floor(userFTP * 0.5);
            currBgColor = "rgb(141, 141, 141)";
            break;
        case 2:
            editCardPowerPer.innerText = 65;
            card.power = Math.floor(userFTP * 0.65);
            currBgColor = "rgb(59, 179, 248)";
            break;
        case 3:
            editCardPowerPer.innerText = 81;
            card.power = Math.floor(userFTP * 0.81);
            currBgColor = "rgb(46, 196, 71)";
            break;
        case 4:
            editCardPowerPer.innerText = 94;
            card.power = Math.floor(userFTP * 0.94);
            currBgColor = "rgb(252, 132, 53)";
            break;
        case 5:
            editCardPowerPer.innerText = 104;
            card.power = Math.floor(userFTP * 1.04);
            currBgColor = "rgb(233, 203, 68)";
            break;
    }

    if (card.isFreeride) {
        card.isFreeride = false;
        // update edit card title
        document.querySelector("#plan-card-0 .btn-is-freeride").style.backgroundColor = "rgba(255, 255, 255, .5)";
        document.querySelector("#plan-card-0 .btn-is-freeride").style.color = "rgb(82, 82, 82)";
        document.querySelector("#plan-card-0 .title-freeride").style.display = "none";
        document.querySelector("#plan-card-0 .title-zone").style.display = "inline";
    }

    editCardPowerWatt.innerText = card.power;
    editCardTitleZone.innerText = zone;
    editCardTitlePower.innerText = card.power;
    document.querySelector(`#plan-card-0 .edit-card`).style.backgroundColor = currBgColor;
}