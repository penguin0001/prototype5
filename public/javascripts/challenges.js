// GENERAL

// note - order is currently hardcoded into these functions
// store results in this array of booleans - true being a correct answer, false being wrong
// after the final challenge this will be saved to the databse along with the date the test was taken
let results = new Array(3);

// get HTML for challenges
const challengeContainer = document.getElementById("challenge-container");
const airconContainer = document.getElementById("air-con");
const crashContainer = document.getElementById("crash");
const rfContainer = document.getElementById("fountains");
const dtContainer = document.getElementById("desks");
const endContainer = document.getElementById("endscreen");
const startContainer = document.getElementById("startscreen");

// remove what's there already ready to load in the challenges
while (challengeContainer.firstChild) {
    challengeContainer.removeChild(challengeContainer.firstChild);
}

// call when replacing DOM content between challenges/screens
function replaceContainer(newContainer) {
    if (challengeContainer.firstChild) challengeContainer.removeChild(challengeContainer.firstChild);
    challengeContainer.appendChild(newContainer);
}

// START SCREEN - consists of a title and a button to begin
function startScreen(firstChallenge) {
    challengeContainer.appendChild(startContainer);
    document.getElementById("start-submit").addEventListener("click", () => {
        firstChallenge();
    });
}


// CHALLENGE 1 - AIR CONDITIONING (difficulty - low) //

// IMPORTANT VARIABLES //

// keep track of how many units the user has placed //
let airConUnits = 0;

// FUNCTIONS //

// assign numbers to each button so they can be compared later
function acAssignButtonIds() {
    const buttons = document.querySelectorAll('.ac-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("id", "button" + i);
    }
}

// set up ac buttons: //
// add click event listener that adds and removes aircon units 
// aircon units are represented by a fan icon that is appended to the square button the user clicks
// user may not place more than 4
function acSetUpButtons() {
    const buttons = document.querySelectorAll('.ac-button');
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.firstChild) {
                button.removeChild(button.firstChild);
                if (airConUnits > 0) airConUnits--;
            } else if (airConUnits < 4) {
                const icon = document.createElement("icon");
                icon.classList.add("fa-solid");
                icon.classList.add("fa-fan");
                button.appendChild(icon);
                airConUnits++;
            }
        })
    });
}

// set up clear button: //
// add click event listener that gets all buttons and removes children (ie ac units) from any that have them
function acSetUpClearButton(clearButton) {
    clearButton.addEventListener("click", () => {
        const buttons = document.querySelectorAll('.ac-button');
        buttons.forEach(button => {
            if (button.firstChild) {
                button.removeChild(button.firstChild);
                airConUnits--;
            }
        })
    });
}

// get positions of aircon units: //
// loop through buttons and add ones with units on to an array which will be returned
function acGetUnitPositions() {
    const buttons = document.querySelectorAll(".ac-button");
    let positions = [];
    buttons.forEach(button => {
        if (button.firstChild) {
            positions.push(button.getAttribute("id"));
        }
    })
    return positions;
}

// set up submit button: //
// declare answers and add click event listener that checks answers and loads next challenge
function acSetUpSubmit(submitButton, nextChallenge) {
    // correct answers i.e. buttons that should have units on
    const answer1 = JSON.stringify(["button4" , "button5",  "button19", "button36"]);
    const answer2 = JSON.stringify(["button4" , "button5",  "button19", "button37"]);
    const answer3 = JSON.stringify(["button4" , "button5",  "button19", "button38"]);

    submitButton.addEventListener("click", () => {
        const positionsString = JSON.stringify(acGetUnitPositions());
        if (positionsString.includes(null) || airConUnits < 4) {
            console.log("place more");
            document.getElementById("ac-warning").style.visibility = "visible";
        } else if (positionsString == answer1 || positionsString == answer2 || positionsString == answer3) {
            console.log("Correct");
            results[0] = true;
            nextChallenge();
        } else {
            console.log("Wrong");
            results[0] = false;
            nextChallenge();
        }
    })
}

// main aircon function: //
// called to load aircon challenge
function airConditioning() {
    // update HTML
    replaceContainer(airconContainer);

    // assign numbers to each button so they can be compared later
    acAssignButtonIds();

    // add and remove aircon units
    acSetUpButtons();

    // clear button - remove all placed aircon units
    acSetUpClearButton(document.getElementById("ac-clear"));

    // submit button - save answers and move on to next challenge
    acSetUpSubmit(document.getElementById('ac-submit'), dontCrash);
}


// CHALLENGE 2 - DON'T CRASH (difficulty - medium)
// VARIABLES //
// correct positions of squares
const correctAnswers = ["14", "15", "20", "21", "26", "27"];

// FUNCTIONS //

// generate grid/room: //
// generate a 7 by 6 grid of clickable squares
function dcGenerateGrid(box) {
    // create a 7 by 6 grid of clickable squares w ids.
    let id = 0;
    for (let i = 0; i < 7; i++) {
        // make 7 columns, add to DOM
        const col = document.createElement("div");
        col.classList.add("col");
        box.appendChild(col);
        for (let j = 0; j < 6; j++) {
            // add 6 squares per column:
            // make them clickable, give them unique numerical ids, give them a class indicating current state
            const crashButton = document.createElement("div");
            crashButton.classList.add("crash-button");
            crashButton.classList.add("off");
            crashButton.setAttribute("id", id);
            crashButton.addEventListener("click", () => {
                if (crashButton.classList[1] == "off") {
                    crashButton.style.background = "linear-gradient(rgb(0, 149, 255) 40%, rgb(53, 171, 255) 99%)";
                    crashButton.classList.remove("off");
                    crashButton.classList.add("on");
                    // turn off the warning if its on
                    document.getElementById("crash-warning").style.visibility = "hidden";
                } else {
                    crashButton.style.background = "none";
                    crashButton.style.backgroundColor = "#ebebeb";
                    crashButton.classList.remove("on");
                    crashButton.classList.add("off");
                }
            });
            col.appendChild(crashButton);
            id++;
        }
    }
}

// set up clear button: //
// add click event to remove all blue squares
function dcSetUpClearButton(clearButton) {
    clearButton.addEventListener("click", () => {
        document.querySelectorAll(".crash-button").forEach(crashButton => {
            if (crashButton.classList[1] == "on") {
                crashButton.style.background = "none";
                crashButton.style.backgroundColor = "#ebebeb";
                crashButton.classList.remove("on");
                crashButton.classList.add("off");
            }
        })
    })
}

// get user answers: //
// checks all squares and returns array of blue/selected ones
function dcGetUserAnswers() {
    const userAnswers = new Array();
    document.querySelectorAll(".crash-button").forEach(crashButton => {
        if (crashButton.classList[1] == "on") {
            userAnswers.push(crashButton.getAttribute("id"));
        }
    });
    return userAnswers;
}

// set up submit button: //
// add click event to submit button that gets users answers and checks them
// either display warning or move on to next challenge
function dcSetUpSubmitButton(submitButton, nextChallenge) {

    // when submit is clicked, get ids of selected sqaures and compare to correct answer
    submitButton.addEventListener("click", () => {
        
        // get array of ids of selected squares
        const userAnswers = dcGetUserAnswers();

        // check answers
        if (userAnswers.length <= 0) {
            // show warning if user hasn't placed anything
            document.getElementById("crash-warning").style.visibility = "visible";
        } else {
            // compare answers, store result in array, move on
            if (JSON.stringify(correctAnswers) == JSON.stringify(userAnswers)) {
                console.log("Correct");
                results[1] = true;
                nextChallenge();
            } else {
                console.log("Wrong");
                results[1] = false;
                nextChallenge();
            }
        }
        
    });
}


// main dont crash function: //
// called to load dont crash challenge
function dontCrash() {
    // remove previous DOM content and add HTML for this challenge
    replaceContainer(crashContainer);

    // generate grid, supplying function with box to put it in
    dcGenerateGrid(document.getElementsByClassName("challenge-box-left")[0]);

    // set up clear button that removes all selected squares
    dcSetUpClearButton(document.getElementById("crash-clear"));
    
    // set up submit button that checks answers and moves onto next challenge
    dcSetUpSubmitButton(document.getElementById("crash-submit"), royalFountains);
}


// CHALLENGE 3 - ROYAL FOUNTAINS (difficulty - high)

// VARIABLES //
const pathColour = '#bfbfbf';

// track and display number of carpets
let carpets = 0;

// correct answer options (there are 24)
const answer1a = JSON.stringify(["11", "12", "13", "14", "15", "16", "27", "38", "44", "45", "46", "47", "48"]);
const answer1b = JSON.stringify(["6", "9", "17", "20", "28", "31", "39", "42", "50", "53", "56", "57", "58"]);
const answer1c = JSON.stringify(["11", "12", "13", "14", "15", "21", "32", "43", "44", "45", "46", "47", "48"]);
const answer1d = JSON.stringify(["1", "2", "3", "6", "9", "17", "20", "28", "31", "39", "42", "50", "53"]);
const answer2a = JSON.stringify(["11", "12", "13", "14", "15", "17", "28", "39", "44", "45", "46", "47", "48"]);
const answer2b = JSON.stringify(["6", "9", "17", "20", "28", "31", "39", "42", "45", "46", "47", "50", "53"]);
const answer2c = JSON.stringify(["11", "12", "13", "14", "15", "20", "31", "42", "44", "45", "46", "47", "48"]);
const answer2d = JSON.stringify(["6", "9", "12", "13", "14", "17", "20", "28", "31", "39", "42", "50", "53"]);
const answer3a = JSON.stringify(["11", "12", "13", "14", "15", "18", "29", "40", "44", "45", "46", "47", "48"]);
const answer3b = JSON.stringify(["6", "9", "17", "20", "28", "31", "34", "35", "36", "39", "42", "50", "53"]);
const answer3c = JSON.stringify(["11", "12", "13", "14", "15", "19", "30", "41", "44", "45", "46", "47", "48"]);
const answer3d = JSON.stringify(["6", "9", "17", "20", "23", "24", "25", "28", "31", "39", "42", "50", "53"]);
const answer4a = JSON.stringify(["6", "12", "13", "14", "15", "17", "28", "39", "45", "46", "47", "48", "50"]);
const answer4b = JSON.stringify(["6", "9", "17", "20", "28", "31", "39", "42" ,"44", "45", "46", "47", "48"]);
const answer4c = JSON.stringify(["9", "11", "12", "13", "14", "20", "31", "42", "44", "45", "46", "47", "53"]);
const answer4d = JSON.stringify(["11", "12", "13", "14", "15", "17", "20", "28", "31", "39", "42", "50", "53"]);
const answer5a = JSON.stringify(["6", "12", "13", "14", "15", "17", "28", "39", "44", "45", "46", "47", "48"]);
const answer5b = JSON.stringify(["6", "9", "17", "20", "28", "31", "39", "42", "44", "45", "46", "47", "53"]);
const answer5c = JSON.stringify(["11", "12", "13", "14", "15", "20", "31", "42", "44", "45", "46", "47", "53"]);
const answer5d = JSON.stringify(["6", "12", "13", "14", "15", "17", "20", "28", "31", "39", "42", "50", "53"]);
const answer6a = JSON.stringify(["11", "12", "13", "14", "15", "17", "28", "39", "45", "46", "47", "48", "50"]);
const answer6b = JSON.stringify(["6", "9", "17", "20", "28", "31", "39", "42", "45", "46", "47", "48", "50"]);
const answer6c = JSON.stringify(["9", "11", "12", "13", "14", "20", "31", "42", "44", "45", "46", "47", "48"]);
const answer6d = JSON.stringify(["9", "11", "12", "13", "14", "17", "20", "28", "31", "39", "42", "50", "53"]);

const answers = [answer1a, answer1b, answer1c, answer1d, answer2a, answer2b, answer2c, answer2d, answer3a, answer3b, answer3c, answer3d, 
    answer4a, answer4b, answer4c, answer4d, answer5a, answer5b, answer5c, answer5d, answer6a, answer6b, answer6c, answer6d];

// FUNCTIONS //

// add fountain: //
// creates a blue circle with class fountain and appends to given column
function rfAddFountain(col) {
    const fountain = document.createElement("div");
    fountain.classList.add("rf-fountain");
    col.appendChild(fountain);
}

// add path: //
// creates a container with a path in the specified direction with the specified id
function rfAddPath(col, direction, id) {
    const pathBox = document.createElement("div");
    pathBox.classList.add("rf-path-box");
    col.appendChild(pathBox);
    const path = document.createElement("div");
    path.classList.add("rf-path");
    path.classList.add(direction);
    path.classList.add("off");
    path.setAttribute("id", id);
    path.style.backgroundColor = pathColour;
    pathBox.appendChild(path);
}

// add gap: //
// creates a blank square to form the gaps between paths
function rfAddGap(col) {
    const square = document.createElement("div");
    square.classList.add("rf-square");
    col.appendChild(square);
}

// add column: //
// creates a column and adds it to specified box
function rfAddColumn(box) {
    const col = document.createElement("div");
    col.classList.add("col");
    box.appendChild(col);
    return col;
}

// generate the royal gardens: //
// made up of fountains (blue circles), paths (grey rectangles) and empty space (transparent squares)
// paths all assigned an id for accessing later
function rfGenerateGardens(box) {
    let id = 0;
    for (let i = 0; i < 11; i++) {
        const col = rfAddColumn(box);
        for (let j = 0; j < 11; j++) {
            if (i % 2 == 0 && j % 2 == 0) {
                rfAddFountain(col);
            } else if (i % 2 == 0 && j % 2 != 0) {
                rfAddPath(col, "vertical", id);
                id++;
            } else if (i % 2 != 0 && j % 2 == 0) {
                rfAddPath(col, "horizontal", id);
                id++;
            } else {
                rfAddGap(col);
            }
        }
    }
}

// set up paths: //
// when clicked, either turn red/add carpet or remove red/remove carpet
function rfSetUpPaths() {
    document.querySelectorAll(".rf-path").forEach(path => {
        path.addEventListener("click", () => {
            if (path.classList[2] == "off") {
                path.style.backgroundColor = "red";
                path.classList.remove("off");
                path.classList.add("on");
                // update count and display
                carpets++;
                document.getElementById("numcarpets").innerHTML = "Carpets: " + carpets;
                // remove warning if its there
                document.getElementById("rf-warning").style.visibility = "hidden";
            } else {
                path.style.backgroundColor = pathColour;
                path.classList.remove("on");
                path.classList.add("off");
                // update count and display
                carpets--;
                document.getElementById("numcarpets").innerHTML = "Carpets: " + carpets;
            }    
        })
    })
}

// update carpets: //
// updates display of the number of currently placed carpets
function rfUpdateCarpets() {
    document.getElementById("numcarpets").innerHTML = "Carpets: " + carpets;
}

// set up clear button: //
// remove all placed carpets
function rfSetUpClearButton(clearButton) {
    clearButton.addEventListener("click", () => {
        document.querySelectorAll(".rf-path").forEach(path => {
            if (path.classList[2] == "on") {
                path.style.backgroundColor = pathColour;
                path.classList.remove("on");
                path.classList.add("off");
                carpets--;
            }
        })
        rfUpdateCarpets();  
    });
}

// get user answer: //
function rfGetUserAnswers() {
    let userAnswer = [];
    document.querySelectorAll(".rf-path").forEach(path => {
        if (path.classList[2] == "on") {
            userAnswer.push(path.getAttribute("id"));
        }
    });
    return userAnswer;
}

// set up submit button: //
// when clicked, get and compare user answers, then move on 
function rfSetUpSubmitButton(submitButton, nextChallenge) {
    // submit answer
    submitButton.addEventListener("click", () => {
        const userAnswer = rfGetUserAnswers();
        // check answers
        if (userAnswer.length <= 0) {
            // warn if user hasn't placed anything
            document.getElementById("rf-warning").style.visibility = "visible";
        } else {
            // compare to correct answers
            let success = false;
            answers.forEach(answer => {
                if (JSON.stringify(userAnswer) == answer) {
                    success = true;
                }
            })
            
            // add to final result
            results[2] = success;

            // move on
            nextChallenge();
        }
        
    });
}


// main royal fountains function: //
// called to load royal fountains challenge
function royalFountains() {
    // remove previous DOM content and add HTML for this challenge
    replaceContainer(rfContainer);

    // generates 'gardens', ie a grid of circles and lines, - supplying with box to put them in
    rfGenerateGardens(document.getElementsByClassName("challenge-box-left")[0]);
   
    // add click events to paths so carpet cam be added/removed
    rfSetUpPaths();

    // clear button - clear all carpets
    rfSetUpClearButton(document.getElementById("rf-clear"));

    // submit button - submit answers and move on
    rfSetUpSubmitButton(document.getElementById("rf-submit"), deskTrouble);
}

function deskTrouble() {
    replaceContainer(dtContainer);
    const dtAnswer1 = document.getElementById("dt-submit-1").addEventListener("click", () => {
        results[3] = true;
        // move on
        endScreen();
    });
    const dtAnswer2 = document.getElementById("dt-submit-2").addEventListener("click", () => {
        results[3] = false;
        // move on
        endScreen();
    });
    const dtAnswer3 = document.getElementById("dt-submit-3").addEventListener("click", () => {
        results[3] = false;
        // move on
        endScreen();
    });
    const dtAnswer4 = document.getElementById("dt-submit-4").addEventListener("click", () => {
        results[3] = false;
        // move on
        endScreen();
    });
    
}
// END SCREEN - consists of a title and a button to save results
function endScreen() {
    replaceContainer(endContainer);
    // put the results in the form to submit them to the db
    // probably a better way of doing this but oh well
    document.getElementById("challengeResults").value = results;
    // again slightly dodgy method - store results in cookie to display them after theyve been saved without having to make a spooky scary api call
    sessionStorage.setItem("results", results);
}

// start:
startScreen(airConditioning);



