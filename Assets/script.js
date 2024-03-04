//console.log("",questions[4].choices[0])
$(document).ready(function(){
    let timer= document.getElementById("timer");
    let started= document.getElementById("started");
    let startButton= document.getElementById("start");
    let questionDisplay= document.getElementById("question");
    let questionsDisplay= document.getElementById("questions");
    let answersDisplay= document.getElementById("answers");
    let seconds= 60;

    function nextQuestion(){
        questionsDisplay.style.display = "block"
        //TODO: put in submit button
        //TODO: render questions and answers
        //TODO: render the radio buttons to choose
        //TODO: compare answers
        //TODO: render the next question
    }

    function startQuiz(){
        started.style.display = "none"
        nextQuestion()
    }

    startButton.addEventListener("click",function(){
    console.log("work")
    let sec= setInterval(
        () => {
            seconds--
            timer.innerHTML = seconds
            startQuiz()
        },
        1000
    );
   })
});