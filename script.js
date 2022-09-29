let canvas = document.getElementById('Mycanvas');
let ctx = canvas.getContext('2d');
const GAME_BOARD_WIDTH = 480, GAME_BOARD_HEIGHT = 360;
const BALL_RADIUS = 7, BALL_RADIAN = 30, BALL_SPEED = 10;//radian là độ,radius là bo tròn
const SCORE_INCREASING_SPEED = 1000;
let a = 0;
let score = 0;

let x = canvas.width/2;//240
let y = canvas.height-BALL_RADIAN;//330
let dx = 2;
let dy = -2;

var rightPresed = false;
var leftPresed = false;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH =85;
let paddleX =(canvas.width-PADDLE_WIDTH)/2;//197.5
let GameBoard = function (width,height){
    this.width = width;
    this.height = height;
    this.drawGameBoard = function (canvas) {
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);
    }
}
let Ball = function (){
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.ballRadian = BALL_RADIAN;
    this.ballSpeed = BALL_SPEED;
    this.drawBall = function (){
        ctx.beginPath();
        ctx.arc(x,y,BALL_RADIUS,0,Math.PI*2);
        ctx.fillStyle = '#7c7c7c';
        ctx.fill();
        ctx.closePath();
    }
    this.moveBall = function (){
        x += dx;
        y += dy;
        this.left = x - BALL_SPEED;
        this.top = y - BALL_SPEED;
        this.right = x + BALL_SPEED;
        this.bottom = y + BALL_SPEED;

        if(this.left <= 0 || this.right >= GAME_BOARD_WIDTH) dx= -dx;
        if(this.top <= 0 || this.bottom >= GAME_BOARD_HEIGHT) dy = -dy;
    }
    this.gameOver = function (){
        if(y > canvas.height-BALL_SPEED-1){//350>349
                alert('GAME OVER');
                document.location.reload();
        }
    }
    this.Collide = function (){
        if (y + dy> canvas.height - PADDLE_HEIGHT-BALL_RADIAN-BALL_SPEED) {//360-10-30=320
            if (x > paddleX && x < paddleX + PADDLE_WIDTH) {//197.5+85=282.5
                dy = -dy - 0.2;
            }
        }
    }
}
let Paddle = function (width,xCoordinate){
    this.width = width;
    this.height = PADDLE_HEIGHT;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = canvas.height - PADDLE_HEIGHT;//350
    this.drawPaddle = function (){
        ctx.beginPath();
        ctx.rect(paddleX, this.yCoordinate-BALL_RADIAN, this.width, this.height);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }
    this.movePaddle = function (){
        document.addEventListener('keydown',keyDownHandler,false);
        document.addEventListener('keyup', keyUpHandler, false);
        function keyDownHandler(e){
            if(e.keyCode===39){
                rightPresed = true;
            }
            else if(e.keyCode===37){
                leftPresed = true;
            }
        }
        function keyUpHandler(e){
            if(e.keyCode===39){
                rightPresed = false;
            }
            else if(e.keyCode===37){
                leftPresed = false;
            }
        }
        if(rightPresed && paddleX < canvas.width-PADDLE_WIDTH) {
            paddleX += 7;
        }
        else if(leftPresed&&paddleX>0) {
            paddleX -= 7;
        }
    }
    this.drawscore = function (){
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+ score, 8, 20);
    }
    this.wingame=function (){
        if (score<SCORE_INCREASING_SPEED){
            a+=0.01;
            score= parseInt(a);
        }
        else {
            alert('YOU WIN');
            document.location.reload();
        }

    }
    this.drawPaddle();
}



function drawGame(){
    let ball = new Ball(x,y, BALL_RADIAN, BALL_SPEED);
    ball.moveBall();
    let paddle = new Paddle(PADDLE_WIDTH,200);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ball.drawBall();
    ball.gameOver();
    ball.Collide();
    paddle.movePaddle();
    paddle.wingame();
    paddle.drawscore();
    paddle.drawPaddle(paddleX,PADDLE_WIDTH);
}

let gameBoard = new GameBoard(GAME_BOARD_WIDTH,GAME_BOARD_HEIGHT);
gameBoard.drawGameBoard(canvas);
const interval = setInterval(drawGame,BALL_SPEED);