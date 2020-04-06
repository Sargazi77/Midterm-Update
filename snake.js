let cvs = document.getElementById("snake");
let ctx = cvs.getContext("2d");

// Creatw the unit
let box = 32;

// load images 
let ground = new Image();
ground.src = "Pictures/1.jpg";

let foodPic = new Image();
foodPic.src = "Pictures/333.png";

//load auio files
let over = new Audio()
let eat = new Audio()
let move = new Audio()

over.src = "audio/over.mp3"
eat.src = "audio/food.mp3"
move.src = "audio/click.mp3"

//creat the snake
let snake =[];
snake [0] = {
    x : 9 * box,
    y : 10 * box
}

//create the food

let food = {
    x: Math.floor(Math.random() * 17+1) * box,
    y: Math.floor(Math.random() * 15+3) * box

}

//creat the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        move.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        move.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        move.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        move.play();
    }
}

//collision
function collision(head,array) {
    for (let i = 0; i <array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


//draw eveerything to the canvas

function draw() {
    ctx.drawImage (ground,0,0);

    for (let i= 0;i< snake.length ; i++){
        ctx.fillStyle = (i==0)? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

        ctx.drawImage(foodPic,food.x,food.y);
        // old head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

         // which direction
        if( d == "LEFT") snakeX -= box;
        if( d == "UP") snakeY -= box;
        if( d == "RIGHT") snakeX += box;
        if( d == "DOWN") snakeY += box;


        //if the snake eats the food
        if(snakeX ==food.x && snakeY == food.y) {
            score++;
            eat.play();
            food = {
                x: Math.floor(Math.random() * 17+1) * box,
                y: Math.floor(Math.random() * 15+3) * box
            }
         
        }else {  //when it doesn't eat the food 

        //remove the tail
        snake.pop();
    }
       //add New Heed

       let newHead = {
        x: snakeX,
        y: snakeY
    }
    //game over
    if(snakeX < 0  || snakeX > 18 * box || snakeY < 0 || snakeY > 18*box || collision(newHead,snake)) {
        clearInterval(game);
        over.play();
        alert("Your Score is: " + score )
        window.location.reload();
    }

    snake.unshift(newHead)

    ctx.fillStyle = "white";
    ctx.font = "45px Change one"; 
    ctx.fillText(score,2*box,1.6*box);
}
// call raw function every 100 ms

let game = setInterval(draw,100);
