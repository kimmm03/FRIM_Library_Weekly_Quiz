// ========================================
// FRIM WEEKLY QUIZ - WEEK 01
// Quiz Interaction
// ========================================


// ========================================
// SOUND EFFECTS
// ========================================

const clickSound = new Audio("../sounds/click.mp3");
const correctSound = new Audio("../sounds/correct.mp3");
const wrongSound = new Audio("../sounds/wrong.mp3");

// ========================================
// BUTTON CLICK SOUND
// ========================================

document.addEventListener("click", event => {

    const clickedButton = event.target.closest(
        "button, a"
    );

    if (!clickedButton) {
        return;
    }

    // Answer options already play clickSound
    if (clickedButton.classList.contains("answer-option")) {
        return;
    }

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

});

// ========================================
// CURRENT PAGE
// ========================================

const currentPage = window.location.pathname.split("/").pop();

// ========================================
// QUIZ TIMER - WEEK 01
// ========================================

const timerStartKey = "frimQuizWeek01StartTime";
const timerDurationKey = "frimQuizWeek01TimeTaken";

// Reset timer and previous answers when starting a new attempt
if (currentPage === "index.html") {
    localStorage.removeItem(timerStartKey);
    localStorage.removeItem(timerDurationKey);
    localStorage.removeItem("frimQuizWeek01Answers");
}


// ========================================
// CORRECT ANSWERS
// ========================================

const correctAnswers = {
    "index.html": "A",
    "q2.html": "B",
    "q3.html": "A"
};


// Get correct answer
const correctAnswer = correctAnswers[currentPage];


// ========================================
// ANSWER OPTIONS
// ========================================

const answerOptions =
    document.querySelectorAll(".answer-option");

const submitButton =
    document.getElementById("submit-button");


// ========================================
// SELECT ANSWER
// ========================================

answerOptions.forEach(option => {

option.addEventListener("click", () => {

    // Start timer when the player first interacts with Q1
    if (
        currentPage === "index.html" &&
        !localStorage.getItem(timerStartKey)
    ) {
        localStorage.setItem(
            timerStartKey,
            String(Date.now())
        );
    }

    // Remove previous selection
    answerOptions.forEach(item => {
        item.classList.remove("selected");
    });

    // Select current answer
    option.classList.add("selected");

    // Play click sound
    clickSound.currentTime = 0;
    clickSound.play();
});

});


// ========================================
// SUBMIT ANSWER
// ========================================

submitButton.addEventListener("click", () => {

    const selectedOption =
        document.querySelector(".answer-option.selected");


    // No answer selected
    if (!selectedOption) {

        alert("Please select an answer first.");

        return;
    }


    const selectedAnswer =
        selectedOption.dataset.answer;

    
        
    // ========================================
    // SAVE ANSWER FOR SCORE CALCULATION
    // ========================================

    const questionNumbers = {
        "index.html": "1",
        "q2.html": "2",
        "q3.html": "3"
    };

    const questionNumber = questionNumbers[currentPage];

    if (questionNumber) {
        const storageKey = "frimQuizWeek01Answers";

        let savedAnswers = {};

        try {
            savedAnswers = JSON.parse(
                localStorage.getItem(storageKey) || "{}"
            );
        } catch (error) {
            savedAnswers = {};
        }

        savedAnswers[questionNumber] = selectedAnswer;

        localStorage.setItem(
            storageKey,
            JSON.stringify(savedAnswers)
        );
    }



    // ========================================
    // CORRECT ANSWER
    // ========================================

    if (selectedAnswer === correctAnswer) {

        // Play correct sound
        correctSound.currentTime = 0;
        correctSound.play();


        // Wait before redirect
        setTimeout(() => {

            if (currentPage === "index.html") {
                window.location.href = "correct_q1.html";
            }

            else if (currentPage === "q2.html") {
                window.location.href = "correct_q2.html";
            }

            else if (currentPage === "q3.html") {
                window.location.href = "correct_q3.html";
            }

        }, 500);

    }


    // ========================================
    // WRONG ANSWER
    // ========================================

    else {

        // Play wrong sound
        wrongSound.currentTime = 0;
        wrongSound.play();


        // Wait before redirect
        setTimeout(() => {

            if (currentPage === "index.html") {
                window.location.href = "wrong_q1.html";
            }

            else if (currentPage === "q2.html") {
                window.location.href = "wrong_q2.html";
            }

            else if (currentPage === "q3.html") {
                window.location.href = "wrong_q3.html";
            }

        }, 500);

    }

});