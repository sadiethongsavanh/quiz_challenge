//console.log("",questions[4].choices[0])
$(document).ready(function(){
    let timer = document.getElementById("timer");
    let started = document.getElementById("started");
    let startButton = document.getElementById("start");
    let questionDisplay = document.getElementById("question");
    let questionsDisplay = document.getElementById("questions");
    let answersDisplay = document.getElementById("answers");
    let seconds = 60;
    let submitBtn = document.getElementById("submit")
    let increment = 0
    let correctDisplay = document.getElementById("correct")
    let wrongDisplay = document.getElementById("wrong")
    let highScore = 0
    let scoreDisplay = document.getElementById("high-score")
    let endOfQuestions = document.getElementById("end-of-questions");
    let input_initials = document.getElementById("initials")
    let submit_initials = document.getElementById("initials-submit")
    let initials_ = ""
    let high_scores = document.getElementById("high-scores")
    let output_initials = document.getElementById("output-initials")
    let output_high_score = document.getElementById("output-high-score")
    // let answer= document.getElementsByClassName("btAnswers");
    var answer = document.querySelectorAll(".btAnswers");

    function endOfQuiz(){
        endOfQuestions.style.display = "block"
        submit_initials.addEventListener("click",function(){
            // console.log("initials")
            initials_ = input_initials.value
            console.log("initials",initials_)
            endOfQuestions.style.display = "none"
            high_scores.style.display = "block"
            output_initials.innerHTML = initials_
            output_high_score.innerHTML = highScore
        })
    }

    function nextQuestion(increment_){
        let questLength= questions.length
        console.log("length",questLength)
        console.log("increment",increment_)
        if(increment_ === questLength){
            questionsDisplay.style.display = "none"
            //Call end of quiz here
            endOfQuiz()
            // endOfQuestions.style.display = "block"
            scoreDisplay.innerHTML = highScore
           return
        }
        // console.log("next question",increment)
        //$("#answers").empty()
        answersDisplay.innerHTML=""
        //TODO: render questions and answers
        questionDisplay.innerHTML = questions[increment_].question
        for (key in questions[increment_].choices) {
            // console.log("question=",questions[increment_].choices[key])
            const button = document.createElement("button");
            button.classList.add("btAnswers");
            button.addEventListener("click",function(){
                correctDisplay.style.display = "none"
                wrongDisplay.style.display = "none"
                // console.log("listener",this.textContent,this.innerText)
                let selected_answer = this.textContent || this.innerText;
                let correct_answer = questions[increment_].answer
                // console.log("correct answer", correct_answer)
                if(selected_answer === correct_answer){
                    // console.log("correct")
                    correctDisplay.style.display = "block"
                    highScore += 10
                }
                else{
                    // console.log("incorrect")
                    wrongDisplay.style.display = "block"
                }
                increment++
                nextQuestion(increment)
            
            })
            button.innerHTML = questions[increment_].choices[key]
            answersDisplay.appendChild(button)
            // console.log("button",button)
        }
        //TODO: render the radio buttons to choose
        //TODO: compare answers
        //TODO: render the next question
        //TODO: calculate score

    }

    function startQuiz(){
        started.style.display = "none"
        questionsDisplay.style.display = "block"
        // console.log("start quiz",increment)
        nextQuestion(increment)
    }

    startButton.addEventListener("click",function(){
    // console.log("work")
    startQuiz()
    let sec= setInterval(
        () => {
            seconds--
            timer.innerHTML = seconds
        },
        1000
    );
   })
   //console.log("increment",increment)
});