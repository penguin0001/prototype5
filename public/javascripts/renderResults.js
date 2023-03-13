/* Read most recent results from session storage and display at /results in results.pug */


const resultArr = sessionStorage.getItem("results").split(",");

// for error screen
if (document.getElementById("challengeResults")) document.getElementById("challengeResults").value = resultArr;


// get current date and time, nicely formatted
const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit'};
const date = new Date().toLocaleString("en-UK", options);

// convert results to percentage
let totalResults = 0;
let passes = 0;
resultArr.forEach(result => {
    if (result == "true") {
        passes++;
    }
    totalResults++;
});

const percentageElement = document.getElementById("percentage");
let percentage = Math.floor((passes / totalResults) * 100);
percentageElement.innerHTML = percentage + "%";
document.getElementById("score").innerHTML = "You got " + passes + "/" + totalResults + " answers correct.";
document.getElementById("date").innerHTML = "Date taken: " + date;

if (percentage <= 20) {
    percentageElement.classList.add("red");
} else if (percentage > 20 && percentage < 40) {
    percentageElement.classList.add("orange");
} else if (percentage >= 40 && percentage <= 50) {
    percentageElement.classList.add("amber");
} else if (percentage > 50 && percentage < 70) {
    percentageElement.classList.add("yellow");
} else if(percentage >= 70 && percentage <=80) {
    percentageElement.classList.add("lime");
} else {
    percentageElement.classList.add("green");
}