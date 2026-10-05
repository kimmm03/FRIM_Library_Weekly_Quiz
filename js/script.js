// ========================================
// FRIM WEEKLY QUIZ - WEEK 01
// Quiz Interaction
// ========================================


// ---------- QUIZ DATA ----------

const correctAnswer = "A";


// ---------- GET HTML ELEMENTS ----------

const answerOptions = document.querySelectorAll(".answer-option");
const submitButton = document.getElementById("submit-button");


// ---------- SELECT ANSWER ----------

answerOptions.forEach(option => {

    option.addEventListener("click", () => {

        // Remove previous selection
        answerOptions.forEach(item => {
            item.classList.remove("selected");
        });

        // Select current answer
        option.classList.add("selected");

    });

});


// ---------- SUBMIT ANSWER ----------

submitButton.addEventListener("click", () => {

    // Get selected answer
    const selectedOption =
        document.querySelector(".answer-option.selected");


    // If no answer selected
    if (!selectedOption) {

        alert("Please select an answer first.");

        return;
    }


    // Get answer letter
    const selectedAnswer =
        selectedOption.dataset.answer;


    // Go to correct or wrong page
    if (selectedAnswer === correctAnswer) {

        window.location.href = "correct.html";

    } else {

        window.location.href = "wrong.html";

    }

});