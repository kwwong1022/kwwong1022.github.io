const planCardArray = [];
let cardId = 1;

// plan-card-0
const planCard0 = {
    id: "plan-card-0",
    mode: 0, // 0-edit, 1-info
    showAvgPower: false,
    isFreeride: false,
    power: 150,
    durationMinute: 30,
    durationSecond: 0,
}
planCardArray.push(planCard0);

// initialize plan card by inserting a planCard object
let cardInitialize = (planCard) => {
    // find elements based on #id + .class pattern
    // edit card title & btns:
    const editCard = document.querySelector(`#${planCard.id} .edit-card`);
    const infoCard = document.querySelector(`#${planCard.id} .card-info`);
    const cardTitleZoneLv = document.querySelector(`#${planCard.id} .title-zone-level`);
    const cardTitlePower = document.querySelector(`#${planCard.id} .title-power`);
    const btnShowAvgPower = document.querySelector(`#${planCard.id} .btn-show-avg-power`);
    const btnIsFreeride = document.querySelector(`#${planCard.id} .btn-is-freeride`);
    // edit card power %:
    const powerPercentage = document.querySelector(`#${planCard.id} .power-percentage`);
    const addPowerPercentageSmall = document.querySelector(`#${planCard.id} .power-percentage-add-sm`);
    const addPowerPercentageLarge = document.querySelector(`#${planCard.id} .power-percentage-add-l`);
    const minusPowerPercentageSmall = document.querySelector(`#${planCard.id} .power-percentage-minus-sm`);
    const minusPowerPercentageLarge = document.querySelector(`#${planCard.id} .power-percentage-minus-l`);
    // edit card watt:
    const powerWatt = document.querySelector(`#${planCard.id} .power-watt`);
    const addPowerWattSmall = document.querySelector(`#${planCard.id} .power-watt-add-sm`);
    const addPowerWattLarge = document.querySelector(`#${planCard.id} .power-watt-add-l`);
    const minusPowerWattSmall = document.querySelector(`#${planCard.id} .power-watt-minus-sm`);
    const minusPowerWattLarge = document.querySelector(`#${planCard.id} .power-watt-minus-l`);

    // btn-show-avg-power
    btnShowAvgPower.addEventListener('click', () => {
        planCard.showAvgPower = !planCard.showAvgPower ? true : false;
        console.log(`${planCard.id}.showAvgPower: ${planCard.showAvgPower}`);

        updateCard();
    });

    // btn-is-freeride
    btnIsFreeride.addEventListener('click', () => {
        planCard.isFreeride = !planCard.isFreeride ? true : false;
        console.log(`${planCard.id}.isFreeRide: ${planCard.isFreeride}`);

        updateCard();
    });

    powerPercentage.innerText = Math.floor(parseInt(planCard.power / userFTP * 100));
    addPowerPercentageSmall.addEventListener('click', () => {
        processPowerData(true, powerPercentage, 1);
    });
    addPowerPercentageLarge.addEventListener('click', () => {
        processPowerData(true, powerPercentage, 5);
    });
    minusPowerPercentageSmall.addEventListener('click', () => {
        processPowerData(true, powerPercentage, -1);
    });
    minusPowerPercentageLarge.addEventListener('click', () => {
        processPowerData(true, powerPercentage, -5);
    });

    powerWatt.innerText = planCard.power;
    addPowerWattSmall.addEventListener('click', () => {
        processPowerData(false, powerWatt, 1);
    });
    addPowerWattLarge.addEventListener('click', () => {
        processPowerData(false, powerWatt, 5);
    });
    minusPowerWattSmall.addEventListener('click', () => {
        processPowerData(false, powerWatt, -1);
    });
    minusPowerWattLarge.addEventListener('click', () => {
        processPowerData(false, powerWatt, -5);
    });

    let processPowerData = (isPer, span, amount) => {
        let curr = parseInt(span.innerText);
        curr += amount;
        curr = curr <= 0? 0:curr;

        if (isPer) {
            planCard.power = Math.floor(curr * userFTP / 100);
            span.innerText = curr;
            powerWatt.innerText = planCard.power;
        } else {
            planCard.power = curr;
            span.innerText = curr;
            powerPercentage.innerText = Math.floor(curr / userFTP * 100);
        }
        updateCard();
    }

    // edit card duration:
    const durationMinute = document.querySelector(`#${planCard.id} .duration-minute`);
    const addDurationMinuteSmall = document.querySelector(`#${planCard.id} .duration-min-add-sm`);
    const addDurationMinuteLarge = document.querySelector(`#${planCard.id} .duration-min-add-l`);
    const minusDurationMinuteSmall = document.querySelector(`#${planCard.id} .duration-min-minus-sm`);
    const minusDurationMinuteLarge = document.querySelector(`#${planCard.id} .duration-min-minus-l`);

    const durationSecond = document.querySelector(`#${planCard.id} .duration-second`);
    const addDurationSecondSmall = document.querySelector(`#${planCard.id} .duration-sec-add-sm`);
    const addDurationSecondLarge = document.querySelector(`#${planCard.id} .duration-sec-add-l`);
    const minusDurationSecondSmall = document.querySelector(`#${planCard.id} .duration-sec-minus-sm`);
    const minusDurationSecondLarge = document.querySelector(`#${planCard.id} .duration-sec-minus-l`);

    durationMinute.innerText = planCard.durationMinute < 10 ? `0${planCard.durationMinute}` : planCard.durationMinute;

    addDurationMinuteSmall.addEventListener('click', () => {
        processDurationData(true, durationMinute, 1);
    });
    addDurationMinuteLarge.addEventListener('click', () => {
        processDurationData(true, durationMinute, 5);
    });
    minusDurationMinuteSmall.addEventListener('click', () => {
        processDurationData(true, durationMinute, -1);
    });
    minusDurationMinuteLarge.addEventListener('click', () => {
        processDurationData(true, durationMinute, -5);
    });

    durationSecond.innerText = planCard.durationSecond < 10 ? `0${planCard.durationSecond}` : planCard.durationSecond;

    addDurationSecondSmall.addEventListener('click', () => {
        processDurationData(false, durationSecond, 1);
    });
    addDurationSecondLarge.addEventListener('click', () => {
        processDurationData(false, durationSecond, 5);
    });
    minusDurationSecondSmall.addEventListener('click', () => {
        processDurationData(false, durationSecond, -1);
    });
    minusDurationSecondLarge.addEventListener('click', () => {
        processDurationData(false, durationSecond, -5);
    });

    let processDurationData = (isMin, span, amount) => {
        let curr = parseInt(span.innerText);
        curr += amount;

        if (isMin) {
            curr = curr < 0 ? 0 : curr;
            planCard.durationMinute = curr;
            span.innerText = curr < 10 ? `0${curr}` : curr;
        } else {
            curr = curr >= 60 ? 0 : curr;
            curr = curr < 0 ? 0 : curr;
            planCard.durationSecond = curr;
            span.innerText = curr < 10 ? `0${curr}` : curr;
        }
        updateCard();
    }

    // plan card modes: 0-edit, 1-info
    const btnAddNewPlan = document.querySelector(`#${planCard.id} .btn-add-new-plan`);
    const btnEditCardExit = document.querySelector(`#${planCard.id} .btn-plan-card-edit-exit`);
    const btnEditCard = document.querySelector(`#${planCard.id} .btn-plan-card-edit`);

    // only first plan card have "add plan card btn" displayed
    if (planCard.id === "plan-card-0") {
        planCard.mode = 0;
        btnAddNewPlan.style.display = "inline";
        btnEditCardExit.style.display = "none";
        editCard.style.display = "flex";
        infoCard.style.display = "none";
    } else {
        // for the rest of plan cards in the array (#workout-plan-session)
        planCard.mode = 1;
        btnAddNewPlan.style.display = "none";
        btnEditCardExit.style.display = "inline";
        editCard.style.display = "none";
        infoCard.style.display = "flex";
    }

    btnEditCard.addEventListener('click', () => {
        if (planCard.mode === 1) {
            planCard.mode = 0;
            editCard.style.display = "flex";
            infoCard.style.display = "none";
        }
    });

    btnEditCardExit.addEventListener('click', () => {
        if (planCard.mode === 0) {
            planCard.mode = 1;
            editCard.style.display = "none";
            infoCard.style.display = "flex";
            updateCard();
            checkWorkoutIsEmpty();
            updateDownloadButton();
        }
    });

    // adding new card to workout plan session
    btnAddNewPlan.addEventListener('click', () => {
        // new plan card object based on inserted data
        let newCard = {
            id: `plan-card-${cardId}`,
            mode: 1, // 0-edit, 1-info
            showAvgPower: planCard.showAvgPower,
            isFreeride: planCard.isFreeride,
            power: planCard.power,
            durationMinute: planCard.durationMinute,
            durationSecond: planCard.durationSecond,
        };

        // input validation
        if (planCard.power <= 0 || typeof planCard.power === "undefined") {
            alert("Invalid power input, please try again.");
        } else if (planCard.durationMinute <= 0 && planCard.durationSecond <= 0 || typeof planCard.durationMinute === "undefined" || typeof planCard.durationSecond === "undefined") {
            alert("Invalid duration input, please try again.");
        } else {
            // adding new plan card object to the array
            planCardArray.push(newCard);
            // create new element with new id and append it to workout plan seession
            updatePlanCardArray();
            checkWorkoutIsEmpty();
            updateDownloadButton();
            // update id no.
            cardId++;
        }
    })

    // plan card delete & Ordering
    const btnPlanCardClear = document.querySelector(`#${planCard.id} .btn-plan-card-clear`);
    const btnPlanCardShiftUp = document.querySelector(`#${planCard.id} .btn-plan-card-shift-up`);
    const btnPlanCardShiftDown = document.querySelector(`#${planCard.id} .btn-plan-card-shift-down`);

    btnPlanCardClear.addEventListener('click', () => {
        planCardArray.forEach((element, index) => {
            if (planCard.id === element.id) {
                console.log(`item ${planCard.id} found.`);
                planCardArray.splice(index, 1);
                console.log("item deleted.");
            }
        });
        updatePlanCardArray();
        checkWorkoutIsEmpty();
    });

    btnPlanCardShiftUp.addEventListener('click', () => {
        console.log(`${planCard.id} shift up function called.`);
        let currPlanCard, currIndex;

        for (let i = 1; i < planCardArray.length; i++) {
            // if curr plan is not in the first place
            if (planCard.id === planCardArray[i].id && i !== 1) {
                console.log(`item ${planCard.id} found.`);
                currIndex = i;
                currPlanCard = {
                    id: planCardArray[i].id,
                    mode: planCardArray[i].mode, // 0-edit, 1-info
                    showAvgPower: planCardArray[i].showAvgPower,
                    isFreeride: planCardArray[i].isFreeride,
                    power: planCardArray[i].power,
                    durationMinute: planCardArray[i].durationMinute,
                    durationSecond: planCardArray[i].durationSecond,
                };
                planCardArray.splice(i, 1);
            }
        }

        if (typeof currPlanCard !== "undefined") {
            planCardArray.splice(currIndex - 1, 0, currPlanCard);
        }
        updatePlanCardArray();
        checkWorkoutIsEmpty();
    });

    btnPlanCardShiftDown.addEventListener('click', () => {
        console.log(`${planCard.id} shift down function called.`);
        let currPlanCard, currIndex;

        for (let i = 1; i < planCardArray.length; i++) {
            // if curr plan is not in the last place
            if (planCard.id === planCardArray[i].id && i !== planCardArray.length - 1) {
                console.log(`item ${planCard.id} found.`);
                currIndex = i;
                currPlanCard = {
                    id: planCardArray[i].id,
                    mode: planCardArray[i].mode, // 0-edit, 1-info
                    showAvgPower: planCardArray[i].showAvgPower,
                    isFreeride: planCardArray[i].isFreeride,
                    power: planCardArray[i].power,
                    durationMinute: planCardArray[i].durationMinute,
                    durationSecond: planCardArray[i].durationSecond,
                };
                planCardArray.splice(i, 1);
            }
        }

        if (typeof currPlanCard !== "undefined") {
            planCardArray.splice(currIndex + 1, 0, currPlanCard);
        }
        updatePlanCardArray();
        checkWorkoutIsEmpty();
    });

    // oncardchange -> sync card data
    let updateCard = () => {
        const cardInfoTitleZoneLv = document.querySelector(`#${planCard.id} .card-info-title-zone-level`);
        const cardInfoTitlePower = document.querySelector(`#${planCard.id} .card-info-title-power`);
        const cardInfoTitleHr = document.querySelector(`#${planCard.id} .card-info-title-zone .card-info-title-hr`);
        const cardInfoTitleMin = document.querySelector(`#${planCard.id} .card-info-title-zone .card-info-title-min`);
        const cardInfoTitleSec = document.querySelector(`#${planCard.id} .card-info-title-zone .card-info-title-sec`);
        const cardInfoTitleFreerideHr = document.querySelector(`#${planCard.id} .card-info-title-freeride .card-info-title-hr`);
        const cardInfoTitleFreerideMin = document.querySelector(`#${planCard.id} .card-info-title-freeride .card-info-title-min`);
        const cardInfoTitleFreerideSec = document.querySelector(`#${planCard.id} .card-info-title-freeride .card-info-title-sec`);

        let currPowerPercentage = planCard.power / userFTP;
        let currZone = "";
        let currBgColor = "";

        if (currPowerPercentage < 0.56) {
            currZone = "1"
            currBgColor = "rgb(141, 141, 141)";
        } else if (currPowerPercentage >= 0.56 && currPowerPercentage < 0.76) {
            currZone = "2"
            currBgColor = "rgb(59, 179, 248)";
        } else if (currPowerPercentage >= 0.76 && currPowerPercentage < 0.88) {
            currZone = "3"
            currBgColor = "rgb(46, 196, 71)";
        } else if (currPowerPercentage >= 0.88 && currPowerPercentage < 0.95) {
            currZone = "4"
            currBgColor = "rgb(252, 132, 53)";
        } else if (currPowerPercentage >= 0.95 && currPowerPercentage < 1.05) {
            currZone = "5"
            currBgColor = "rgb(233, 203, 68)";
        } else if (currPowerPercentage >= 1.05 && currPowerPercentage < 1.55) {
            currZone = "6"
            currBgColor = "rgb(233, 68, 68)";
        } else {
            currZone = "7"
            currBgColor = "rgb(170, 35, 159)";
        }

        cardTitleZoneLv.innerText = currZone;
        cardTitlePower.innerText = planCard.power;
        infoCard.style.backgroundColor = currBgColor;
        editCard.style.backgroundColor = currBgColor;

        let hour = Math.floor(planCard.durationMinute / 60);
        let min = Math.floor(planCard.durationMinute % 60);
        let sec = Math.floor(planCard.durationSecond);

        cardInfoTitleZoneLv.innerText = currZone;
        cardInfoTitlePower.innerText = planCard.power;
        cardInfoTitleHr.innerText = hour;
        cardInfoTitleFreerideHr.innerText = hour;

        if (min < 10) {
            cardInfoTitleMin.innerText = `0${min}`;
            cardInfoTitleFreerideMin.innerText = `0${min}`;
        } else {
            cardInfoTitleMin.innerText = min;
            cardInfoTitleFreerideMin.innerText = min;
        }
        if (sec < 10) {
            cardInfoTitleSec.innerText = `0${sec}`;
            cardInfoTitleFreerideSec.innerText = `0${sec}`;
        } else {
            cardInfoTitleSec.innerText = sec;
            cardInfoTitleFreerideSec.innerText = sec;
        }

        const cardInfoIF = document.querySelector(`#${planCard.id} .card-info-if`);
        const cardInfoTSS = document.querySelector(`#${planCard.id} .card-info-tss`);

        // TSS = (sec x NP® x IF®)/(FTP x 3600) x 100
        let intensityFactor = planCard.power / userFTP;
        let tss = (planCard.durationMinute * 60 + planCard.durationSecond) * planCard.power * (planCard.power / userFTP) / (userFTP * 3600) * 100;

        cardInfoIF.innerText = intensityFactor.toFixed(2);
        cardInfoTSS.innerText = Math.floor(tss);

        // update showAvgPower
        if (planCard.showAvgPower) {
            btnShowAvgPower.style.backgroundColor = "rgba(255, 255, 255, 1)";
            btnShowAvgPower.style.color = "grey";
        } else {
            btnShowAvgPower.style.backgroundColor = "rgba(255, 255, 255, .5)";
            btnShowAvgPower.style.color = "rgb(82, 82, 82)";
        }

        // update isFreeride
        const titleFreeride = document.querySelector(`#${planCard.id} .title-freeride`);
        const titleZone = document.querySelector(`#${planCard.id} .title-zone`);
        const cardInfoTitleFreeride = document.querySelector(`#${planCard.id} .card-info-title-freeride`);
        const cardInfoTitleZone = document.querySelector(`#${planCard.id} .card-info-title-zone`);

        if (planCard.isFreeride) {
            btnIsFreeride.style.backgroundColor = "rgba(255, 255, 255, 1)";
            btnIsFreeride.style.color = "grey";
            // update title
            titleFreeride.style.display = "inline";
            titleZone.style.display = "none";
            cardInfoTitleFreeride.style.display = "inline";
            cardInfoTitleZone.style.display = "none";
            // update background
            infoCard.style.backgroundColor = "rgb(78, 113, 226)";
            editCard.style.backgroundColor = "rgb(78, 113, 226)";
            // update IF & TSS
            cardInfoIF.innerText = " -";
            cardInfoTSS.innerText = " -";
        } else {
            btnIsFreeride.style.backgroundColor = "rgba(255, 255, 255, .5)";
            btnIsFreeride.style.color = "rgb(82, 82, 82)";
            // update title
            titleFreeride.style.display = "none";
            titleZone.style.display = "inline";
            cardInfoTitleFreeride.style.display = "none";
            cardInfoTitleZone.style.display = "inline";
        }
    }

    // syncing plan card obj & plan card element
    updateCard();
}

let updatePlanCardArray = () => {
    // clear elements inside "workout plan session"
    const workoutPlanSession = document.querySelector("#workout-plan-session .d-flex");
    while (workoutPlanSession.lastElementChild) {
        workoutPlanSession.removeChild(workoutPlanSession.lastElementChild);
    }

    // create element base on plan card array from array[1]
    for (let i = 1; i < planCardArray.length; i++) {
        // create new element with new id and append it to workout plan seession
        let newCardElement = document.createElement("div");
        newCardElement.id = planCardArray[i].id;
        newCardElement.style.paddingTop = ".5rem";

        let oldChild = document.querySelector("#plan-card-0").innerHTML;
        newCardElement.innerHTML = oldChild;

        workoutPlanSession.appendChild(newCardElement);
        cardInitialize(planCardArray[i]);
    }
}
cardInitialize(planCardArray[0]);