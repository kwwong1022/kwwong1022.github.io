const workoutPlanSubSession = document.querySelector(".workout-plan-session-sub");
let workoutIsEmpty = true;

let checkWorkoutIsEmpty = () => {
    workoutIsEmpty = planCardArray.length === 1 ? true : false;
    updateWorkoutSub();
}

let updateWorkoutSub = () => {
    while (workoutPlanSubSession.lastElementChild) {
        workoutPlanSubSession.removeChild(workoutPlanSubSession.lastElementChild);
    }

    if (workoutIsEmpty) {
        workoutPlanSubSession.innerText = "";
    } else {
        let workoutTitle = document.createElement("h4");
        workoutTitle.innerText = "Workout info:";
        workoutTitle.style.fontSize = "1.2rem";
        workoutTitle.style.fontWeight = "400";
        workoutTitle.style.padding = "0rem 0 1rem";
        workoutPlanSubSession.appendChild(workoutTitle);

        // wu func
        if (hasWM) {
            let newDiv = document.createElement("div");
            let title = document.createElement("h4");
            title.innerText = `Warm up\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa015m 00s`;
            title.style.fontWeight = "400";
            title.style.paddingBottom = ".8rem";
            newDiv.appendChild(title);
            workoutPlanSubSession.appendChild(newDiv);
        }

        for (let i = 1; i < planCardArray.length; i++) {
            let element = planCardArray[i];

            let currPowerPercentage = element.power / userFTP;
            let currZone;
            let hour = Math.floor(element.durationMinute / 60) < 10 ? `0${Math.floor(element.durationMinute / 60)}` : Math.floor(element.durationMinute / 60);
            let min = Math.floor(element.durationMinute % 60) < 10 ? `0${Math.floor(element.durationMinute % 60)}` : Math.floor(element.durationMinute % 60);
            let sec = Math.floor(element.durationSecond) < 10 ? `0${Math.floor(element.durationSecond)}` : Math.floor(element.durationSecond);

            if (currPowerPercentage < 0.56) {
                currZone = "1"
            } else if (currPowerPercentage >= 0.56 && currPowerPercentage < 0.76) {
                currZone = "2"
            } else if (currPowerPercentage >= 0.76 && currPowerPercentage < 0.88) {
                currZone = "3"
            } else if (currPowerPercentage >= 0.88 && currPowerPercentage < 0.95) {
                currZone = "4"
            } else if (currPowerPercentage >= 0.95 && currPowerPercentage < 1.05) {
                currZone = "5"
            } else if (currPowerPercentage >= 1.05 && currPowerPercentage < 1.55) {
                currZone = "6"
            } else {
                currZone = "7"
            }

            let newDiv = document.createElement("div");
            let title = document.createElement("h4");
            let intensityFactor = element.power / userFTP;
            let tss = (element.durationMinute * 60 + element.durationSecond) * element.power * (element.power / userFTP) / (userFTP * 3600) * 100;
            let wkg = element.power / userWeight;

            if (element.isFreeride) {
                if (hour < 1) {
                    title.innerText = `Freeride\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0${min}m ${sec}s`;
                } else {
                    title.innerText = `Freeride\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0${hour}h ${min}m ${sec}s`;
                }
            } else {
                if (hour < 1) {
                    title.innerText = `Zone ${currZone} - ${element.power}w\xa0\xa0\xa0\xa0\xa0\xa0${min}m ${sec}s`;
                } else {
                    title.innerText = `Zone ${currZone} - ${element.power}w\xa0\xa0\xa0\xa0\xa0\xa0${hour}h ${min}m ${sec}s`;
                }
            }
            title.style.fontWeight = "400";
            title.style.paddingBottom = ".3rem";
            newDiv.appendChild(title);
            title = document.createElement("h4");
            title.innerText = `Power: ${Math.floor(element.power / userFTP * 100)}%\xa0\xa0\xa0w/kg: ${wkg.toFixed(1)}\xa0\xa0\xa0IF: ${intensityFactor.toFixed(2)}\xa0\xa0\xa0TSS: ${Math.floor(tss)}`;
            title.style.fontSize = ".9rem";
            title.style.fontWeight = "400";
            title.style.paddingBottom = ".9rem";
            newDiv.appendChild(title);
            workoutPlanSubSession.appendChild(newDiv);
        }

        //cd func
        if (hasCD) {
            let newDiv = document.createElement("div");
            let title = document.createElement("h4");
            title.innerText = `Cold down\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa015m 00s`;
            title.style.fontWeight = "400";
            newDiv.appendChild(title);
            workoutPlanSubSession.appendChild(newDiv);
        }

        let btnSubmit = document.createElement("button");
        btnSubmit.class = "btn-download-workout-file"
        btnSubmit.innerText = "Download workout file"
        btnSubmit.style.padding = ".3rem 2rem .3rem";
        btnSubmit.style.borderWidth = ".1rem";
        btnSubmit.style.backgroundColor = "white";
        btnSubmit.style.color = "rgb(70, 70, 70)";
        btnSubmit.style.cursor = "pointer";
        //btnSubmit.style.boxShadow = "0px 2px 13px 0px #888888"; 
        btnSubmit.style.margin = ".3rem 0 0";
        btnSubmit.addEventListener('mouseover', () => {
            btnSubmit.style.backgroundColor = "rgb(230, 230, 230)";
        });
        btnSubmit.addEventListener('mouseout', () => {
            btnSubmit.style.backgroundColor = "white";
        });
        btnSubmit.addEventListener('click', () => {
            createText('trainingPlan.zwo');
        });
        workoutPlanSubSession.appendChild(btnSubmit);
    }
}

let updateDownloadButton = () => {
    if (window.innerWidth < 1400 && typeof planCardArray[1] !== "undefined") {
        document.querySelector(".main-content .btn-download-a").style.display = "inline"
    }
}

setInterval(()=> {
    if (window.innerWidth > 1400 || typeof planCardArray[1] === "undefined") {
        document.querySelector(".main-content .btn-download-a").style.display = "none"
    } else if (window.innerWidth < 1400 && typeof planCardArray[1] !== "undefined") {
        document.querySelector(".main-content .btn-download-a").style.display = "inline"
    }
}, 100);