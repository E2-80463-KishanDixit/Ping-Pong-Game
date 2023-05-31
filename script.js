// get the elelment
const box = document.getElementById('box');
const bat1 = document.getElementById('bat1');
const bat2 = document.getElementById('bat2');
const ball = document.getElementById('ball');


let innerBox = box.getBoundingClientRect();

// set the initial state of the game
let bat1_X = (innerBox.width/2)-70;
let bat1_Y = innerBox.top;

let bat2_X = (innerBox.width/2)-70;
let bat2_Y = innerBox.bottom-20;

let ballX = (innerBox.width/2);
let ballY = (innerBox.height/2);
let ballMoveX = 3;
let ballMoveY = 3;


// DETECT THE COLLISION WITH BAT
let score1= 0 ;
let score2 = 0;
let maxScore = 0;
function checkCollsion(){
    // CHECK COLLISION  if ball hit BAT 1
    if(ballY < 20 && ballX > bat1_X && ballX < bat1.getBoundingClientRect().right){
        score1 +=1;
        ballMoveY = -ballMoveY;
    }
     // checkCollision if ball hit bat2
    if(ballY > innerBox.bottom-40 && ballX > bat2_X && ballX < bat2.getBoundingClientRect().left + bat2.offsetWidth ){
        score2 += 1;
        ballMoveY = -ballMoveY;
    }
}


// TO UPDATE THE SCORE 
const rod1_score = document.querySelector('#score_1 span');
const rod2_score = document.querySelector('#score_2 span');
const max_score = document.querySelector('#max_score span');
function updateScore(){
    rod1_score.innerHTML = score1;
    rod2_score.innerHTML = score2;
    if(score1 > score2){
        maxScore = score1;
    }else{
        maxScore = score2;
    }
}

// helper function to update the values 
const overCard = document.getElementById('gameOver');
const showHighest = document.querySelector('#gameOver span');
let highestScore =0;
function update(){
    ballX += ballMoveX;
    ballY += ballMoveY;

    // CEHCKING IF BALL HIT THE  LEFT AND RIGHT OF THE BOX
    if(ballX < 0 || ballX >= box.offsetWidth-20){
        ballMoveX = -ballMoveX;
    }
    // CHECKING IF BALL HIT THE TOP AND BOTTOM OF THE BOX
    if(ballY < 0 || ballY >= box.offsetHeight-30){
        if(maxScore > localStorage.getItem(highestScore)){
            localStorage.setItem(highestScore,maxScore);
        }
        showHighest.innerHTML = localStorage.getItem(highestScore);
        overCard.style.display = 'inline-block';
        cancelAnimationFrame(id);
    }
}

// SET THE POSITION OF THE BALL AND BAT 
function draw(){
    ball.style.left = ballX +'px';

    ball.style.top = ballY + 'px';

    bat1.style.left = bat1_X + 'px';
    bat1.style.top = bat1_Y + 'px';

    bat2.style.left = bat2_X + 'px';
    bat2.style.top = bat2_Y + 'px';
}

// HANDLE KEY EVENT TO MOVE BAT
function handleKeyDown(e){
    // to move bat right 
    if((e.keyCode == 68 || e.keyCode == 39) && (bat1.getBoundingClientRect().right < innerBox.right) ){
        bat1_X += 10;
        bat2_X += 10;
    }
    // TO MOVE BAT LEFT
     if((e.keyCode == 65 || e.keyCode == 37) && (bat1_X >= 0 && bat2_X >= 0) ){
        bat1_X -= 10;
        bat2_X -= 10;
    }
}

// Set up the animation loop
function animate() {
    update();
    checkCollsion();
    draw();
   var id =  requestAnimationFrame(animate);
    updateScore();
  }

  // Start the game
  document.addEventListener("keydown", handleKeyDown);
  alert("Game Start!! Highest Score is: " + localStorage.getItem(highestScore) );
  animate();


