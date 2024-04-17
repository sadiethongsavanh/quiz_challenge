//console.log("",questions[4].choices[0])
$(document).ready(function(){
    let timer = document.getElementById("timer");
    let started = document.getElementById("started");
    let startButton = document.getElementById("start");
    let questionDisplay = document.getElementById("question");
    let questionsDisplay = document.getElementById("questions");
    let answersDisplay = document.getElementById("answers");
    let seconds = 80;
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
    let go_back = document.getElementById("go-back")
    let clear_high_score = document.getElementById("clear-high-score")
    let subtract_time = false
    let end_of_game = document.getElementById("end")
    let all_scores = document.getElementById("all-scores")
    let all_scores_ = [];
    // let answer= document.getElementsByClassName("btAnswers");
    let answer = document.querySelectorAll(".btAnswers");
    let questLength= questions.length
    let sec;


    function endOfQuiz(){
        seconds = 80;
        all_scores_.push(highScore)

        questionsDisplay.style.display = "none"
        endOfQuestions.style.display = "block"

        go_back.addEventListener("click",function(){
            init()
            //startQuiz()
        })
    }

    function nextQuestion(increment_){
        wrongDisplay.style.display = "none";
        correctDisplay.style.display = "none";
        //console.log("length",questLength)
        //console.log("increment",increment_)
        if(increment_ === questLength){
            scoreDisplay.innerHTML = highScore
            timer.innerHTML = 0+""
            console.log("sec =", sec)
            clearInterval(sec);
            sec = null;
            increment = 0;
            return endOfQuiz()
        }
        // console.log("next question",increment)
        //$("#answers").empty()
        answersDisplay.innerHTML=""
        //TODO: render questions and answers
        questionDisplay.innerHTML = questions[increment_].question
        for (let key in questions[increment_].choices) {
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
                    subtract_time = true
                }
                increment++
                const buttons = document.getElementsByTagName("button");
                for (const button of buttons) {
                    button.disabled = true;
                }
                setTimeout(function() {
                    for (const button of buttons) {
                        button.disabled =false;
                    }
                    nextQuestion(increment)
                }, 2000);

            })
            button.innerHTML = questions[increment_].choices[key]
            answersDisplay.appendChild(button)
            // console.log("button",button)
        }

    }

    function startQuiz(){
        sec= setInterval(
            () => {
                if(!subtract_time){
                    seconds--
                }
                else{
                    seconds -= 10
                    subtract_time = false
                }


                if(seconds < 1){
                    scoreDisplay.innerHTML = highScore
                    timer.innerHTML = seconds

                    clearInterval(sec);
                    sec = null;
                    timer.innerHTML = 0+""
                    return endOfQuiz()
                }
                timer.innerHTML = seconds
            },
            1000
        );
        started.style.display = "none"
        if(questionsDisplay.style.display === "none"){
            questionsDisplay.style.display = "block"
        }
        // console.log("start quiz",questionsDisplay.style.display )
        seconds = 70;
        nextQuestion(increment)
    }

    function init(){
        high_scores.style.display = "none"
        end_of_game.style.display = "none"
        questionsDisplay.style.display = "none"
        endOfQuestions.style.display = "none"
        started.style.display = "block"
        console.log("init")
        highScore = 0
    }
    submit_initials.addEventListener("click",function(e){
        e.stopPropagation();
        e.preventDefault();
        // console.log("initials")
        initials_ = input_initials.value
        console.log("initials",initials_)
        endOfQuestions.style.display = "none"
        high_scores.style.display = "block"
        output_initials.innerHTML = initials_
        output_high_score.innerHTML = highScore+""

        console.log("scores_array",all_scores_)
        all_scores.innerHTML = all_scores_.map(score => {
            return `<li class="scores">${ score }</li>`;
        }).join('');
    })
    clear_high_score.addEventListener("click",function(){
        all_scores.innerHTML = '';
        all_scores_=[];
    })
    startButton.addEventListener("click",function(){
    // console.log("work")
        startQuiz()
   })
    init();
   // console.log("increment",increment)
});
