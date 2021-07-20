function setup() {
    let myCanvas = createCanvas(250, 140);
    myCanvas.parent('myContainer');
    frameRate(15);
}

const columns = [];
let amount;
let maxHeight = 0;
let maxWidth = 0;
let allColWidth = 0;
let chartWidth = 0;
let chartHeight = 0;
let x = 0;

function draw() {
    initialize();
    processColumnsData();

    // draw grid 
    amount = 5;
    fill(150);
    for (let i = 0; i < 5; i++) {
        rect(width - chartWidth - 6, (height / 5 * i) + (height - chartHeight) + 10, width, 1);
        stroke(0);
        strokeWeight(0.1);
        textAlign(RIGHT);
        switch (i) {
            case 0:
                text(`${Math.floor(maxHeight)}w`, 30, (height / 5 * i) + 25);
                break;
            case 1:
                text(`${Math.floor(maxHeight/2)}w`, 30, (height / 5 * i) + 25);
                break;
            case 2:
                text(`${Math.floor(maxHeight/3)}w`, 30, (height / 5 * i) + 25);
                break;
            case 3:
                text(`${Math.floor(maxHeight/4)}w`, 30, (height / 5 * i) + 25);
                break;
            case 4:
                text(`0w`, 30, (height / 5 * i) + 25);
                break;
            default:
                text(`${Math.floor(maxHeight / i)}w`, 30, (height / 5 * i) + 25);
                break;
        }
        noStroke();
    }

    // draw chart
    let startPos = 0;
    for (let i = 0; i < columns.length; i++) {
        let currZone = getCurrentZone(planCardArray[i + 1].power / userFTP, planCardArray[i + 1].isFreeride);
        let r = getCurrentZoneColor(currZone, "r");
        let g = getCurrentZoneColor(currZone, "g");
        let b = getCurrentZoneColor(currZone, "b");

        let offsetPosX = width - chartWidth, offsetPosY = height - chartHeight;
        let posX = startPos + offsetPosX;
        let posY = height - columns[i].relativeHeight + offsetPosY;

        //let colWidth = 10;
        let colWidth = columns[i].relativeWidth;
        let colHeight = columns[i].relativeHeight;

        noStroke();
        fill(r, g, b, 200);
        rect(posX, posY, colWidth, colHeight);
        startPos += colWidth;
    }
}

let processColumnsData = () => {
    // get max height & maxWidth
    for (let i = 1; i < planCardArray.length; i++) {
        let el = planCardArray[i];
        // get max height & max width
        maxHeight = el.power > maxHeight ? el.power : maxHeight;
        maxWidth = (el.durationMinute * 60 + el.durationSecond) > maxWidth ? (el.durationMinute * 60 + el.durationSecond) : maxWidth;
        amount++;
    }

    // processing col obj:
    // create col obj and push to columns[]
    for (let i = 1; i < planCardArray.length; i++) {
        let el = planCardArray[i];
        // relative width of col
        let relativeWidth;
        let maxWidthRatio = (el.durationMinute * 60 + el.durationSecond) / maxWidth;
        // relative height of col - (power / canvas height)
        let relativeHeight;
        if (el.isFreeride) {
            relativeHeight = chartHeight * (100 / maxHeight);
        } else {
            relativeHeight = chartHeight * (el.power / maxHeight);
        }

        // push col obj to columns[]
        columns.push({
            power: el.power,
            duration: el.durationMinute * 60 + el.durationSecond,
            maxWidthRatio: maxWidthRatio,
            relativeWidth: relativeWidth,
            relativeHeight: relativeHeight
        });
    }

    // calculate relativeWidth:
    // get all column width
    columns.forEach((el) => {
        allColWidth += el.maxWidthRatio;
    });
    x = chartWidth / allColWidth;

    for (let i = 0; i < columns.length; i++) {
        let col = columns[i];
        // width: x(R1 + Rn) = w
        col.relativeWidth = col.maxWidthRatio * x;
    }
}

let getCurrentZone = (currPowerPercentage, isFreeride) => {
    if (isFreeride) {
        return 0;
    } else if (currPowerPercentage < 0.56) {
        return 1;
    } else if (currPowerPercentage >= 0.56 && currPowerPercentage < 0.76) {
        return 2;
    } else if (currPowerPercentage >= 0.76 && currPowerPercentage < 0.88) {
        return 3;
    } else if (currPowerPercentage >= 0.88 && currPowerPercentage < 0.95) {
        return 4;
    } else if (currPowerPercentage >= 0.95 && currPowerPercentage < 1.05) {
        return 5;
    } else if (currPowerPercentage >= 1.05 && currPowerPercentage < 1.55) {
        return 6;
    } else {
        return 7;
    }
}

let getCurrentZoneColor = (zone, colorChannel) => {
    let r, g, b;
    switch (zone) {
        case 0:
            r = 78, g = 113, b = 226;
            break;
        case 1:
            r = 141, g = 141, b = 141;
            break;
        case 2:
            r = 59, g = 179, b = 248;
            break;
        case 3:
            r = 46, g = 196, b = 71;
            break;
        case 4:
            r = 252, g = 132, b = 53;
            break;
        case 5:
            r = 233, g = 203, b = 68;
            break;
        case 6:
            r = 233, g = 68, b = 68;
            break;
        case 7:
            r = 170, g = 35, b = 159;
            break;
    }
    switch (colorChannel) {
        case "r":
            return r;
        case "g":
            return g;
        case "b":
            return b;
    }
}

let initialize = () => {
    background(255);
    noStroke();
    amount = 0;
    maxHeight = 0;
    maxWidth = 0;
    allColWidth = 0;
    // chart padding px
    chartWidth = width - 40;
    chartHeight = height - 10;
    // scale to chart width ratio
    x = 0;

    // initialize column[]
    while (typeof columns[0] !== "undefined") {
        columns.pop();
    }
}

// debug log
function mousePressed() {
    console.log("\n");
    console.log(`all column width: ${allColWidth}`);
    console.log(`max width: ${maxWidth}, max height: ${maxHeight}`);
    console.log(`There are ${amount} columns in columns[]`);
    console.dir(columns);
}