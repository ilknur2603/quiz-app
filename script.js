
const start_btn = document.querySelector(".start_btn");
const exam_box = document.querySelector(".exam_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const countDown = document.querySelector(".countDown");
const quit_btn = document.querySelector(".quit_btn");
const scoreboard = document.querySelector(".scoreboard");
const que_text = document.querySelector(".que_text");
const scoreText = document.querySelector(".score_text");
/*
const username =document.querySelector("Username");
const saveScoreBtn=document.getElementById("saveScoreBtn");

const highScores =JSON.parse(localStorage.getItem('highScores')) || []
const MAX_HIGH_SCORES =5
finalScore.innerText =mostRecentScore

Username.addEventListener("keyup",()=>{
saveScoreBtn.disabled = !Username.value;
});

saveHighScore =e =>{
    e.prevent.Default()
const score ={
    score:mostRecentScore,
    name:username.value
}
highScores.push(score)
highScores.sort((a,b)=> {
    return b.score=a.score
})
highScores.splice(5)
localStorage.setItem('highScores', json.stringify(highScores))
window.location.assign('/')
}
username.addEventListener("keyup",()=>{
    saveScoreBtn.disabled = !username.value;
    });
*/
start_btn.onclick = ()=>{
    exam_box.classList.add("activeQuiz"); 
    showQuetions(que_count); 
    scoreboard_func(que_numb);
    startcountDown(countPoint);
}

quit_btn.onclick = ()=>{
    window.location.reload();
}

let countPoint =  10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let que_temp;


function showQuetions(index){
    if (questions[index].numb === 5) {
        que_temp = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    }
    else if(questions[index].numb === 5) {
          
       
        que_temp = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    }
    else {
        que_temp = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    }

    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>';
    
        for(i=0;i<5;i++) {
            if(questions[index].options[i] != undefined) {
                option_tag+='<div class="option"><span>'+ questions[index].options[i] +'</span></div>'
            }
        };
    
        
    que_text.innerHTML = que_temp; 
    option_list.innerHTML = option_tag;
    
    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    clearInterval(counter); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct");
    }else{
        answer.classList.add("incorrect"); 

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){
                option_list.children[i].setAttribute("class", "option correct"); 
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    window.setTimeout(autoQuestionPast, 1000)
}

function autoQuestionPast(){
    if(que_count < questions.length - 1){ 
        que_count++;
        que_numb++;
        showQuetions(que_count);
        scoreboard_func(que_numb);
        clearInterval(counter);
        startcountDown(countPoint); 
    }else{
        clearInterval(counter);
        showResult();
    }
}

function showResult(){
    exam_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult"); 
    let scoreTag = '<span><p>Total Point '+ userScore +'</p>/<p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
}

function startcountDown(count){
    counter = setInterval(countDowner, 1000);
    function countDowner(){
        countDown.textContent = count;
        count--;
        if(count < 0){ 
            clearInterval(counter);
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            window.setTimeout(autoQuestionPast, 2500)
        }
    }
}

function scoreboard_func(index){
    scoreboard.innerHTML = '<span>'+ userScore +'</p>/<p>'+ index +'</span>';
}
