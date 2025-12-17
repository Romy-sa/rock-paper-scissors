const decisionPara = document.getElementById("decision-paragraph");
const resultPara = document.getElementById("result-paragraph");
const scorePara = document.getElementById("score-paragraph");
const resetBtn = document.getElementById("reset-btn");

//  Retrieve score details from local storage
//  If it does not exist --> initiate score
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

//  Update score paragraph
scorePara.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;


//  Event handling for player choice
document.querySelectorAll(".choice-btn").forEach(element => {
  element.addEventListener("click", (e)=> {
    let playerChoice = e.target.id;
    playGame(playerChoice);
  });
});

//  Keyboard event handling
document.addEventListener("keydown", (e) => {
  if(e.key=== `r` || e.key === `R`){
    playGame(`rock`);
  } else if (e.key === `p` || e.key === `P`){
    playGame(`paper`);
  } else if (e.key === `s` || e.key === `S`){
    playGame(`scissors`);
  }
});

//  Reset score button event handling
resetBtn.addEventListener("click", ()=>{

  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem('score');


  scorePara.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

  decisionPara.textContent = `Score is reset`;

  resultPara.textContent = ``;

});


//  Generate random choice for computer
function generateRandomChoice() {
  let randomNumber = Math.floor(Math.random()*3);
  if(randomNumber === 0){
    return 'rock';
  } else if (randomNumber === 1){	  
    return 'paper';	
  } else {	  
    return 'scissors';
  }
}

//  Update score and score paragraph
function updateScore(playerChoice,computerChoice){
  if (playerChoice === computerChoice){

    score.ties++;
    score.decision = `Tie`;
    return score;

  }
  else if(
  (playerChoice === 'rock' && computerChoice === 'scissors') || (playerChoice === 'scissors' && computerChoice === 'paper') || (playerChoice === 'paper' && computerChoice === 'rock')
  ) {

    score.wins++;
    score.decision = `You win`;
    return score;

  } else {

    score.losses++;
    score.decision = `You lose`;
    return score;

  }
}


//  Play game with user choice Vs. random computer choice
function playGame(playerChoice){
  
  let computerChoice = generateRandomChoice();

  updateScore(playerChoice,computerChoice);

  localStorage.setItem('score', JSON.stringify(score));

  decisionPara.textContent = `${score.decision}`;
  
  resultPara.innerHTML = `
  <div>
    You <img src="images/${playerChoice}-emoji.png" class="result-img"> <img src="images/${computerChoice}-emoji.png" class="result-img"> Computer
  </div>
  `;

  scorePara.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  
}