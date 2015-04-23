//global variables
var score = 0;

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Since canvas width is 505 . If Enemy's x position is < 505 we know that the Enemy is inside the canvas and hence calculate it's x value
    if (this.x < 505) {
        this.x += (this.speed * dt);
    } else {
        //Enemy is back to the init position
        this.x = -10;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Player is the constructor to which you add properties using the "this" keyword
var Player = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    //array to hold all the Player char. images
    var PlayerChars = ['images/char-boy.png','images/char-cat-girl.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png'];
    //randomize the Player image characters
    this.sprite = PlayerChars[Math.floor(Math.random() * PlayerChars.length)];
};

//update for player class
Player.prototype.update = function() {
    // when the player reaches the water tile, then the game has to reset
    if (this.y < 60) {
        this.playerWon();
        this.reset();
    }
    this.updateScore(score);
}

Player.prototype.updateScore = function(score) {
    document.getElementById('score').innerHTML = 'You score: ' +score;
}

Player.prototype.resetScore = function() {
    score = 0;
    this.updateScore(score);
}

//Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Method to increment score once the player reaches the tile without getting hit by the bug
Player.prototype.playerWon = function() {
    score += 10;

}

//Method to decrement score when the player gets hit
Player.prototype.playerHit = function() {
   if (score > 0) {
        score -= 10;
    }
}

//colWidth = 101 , rowHeight = 83 (x counts from left to right , y counts from top to bottom)
Player.prototype.handleInput = function(key) {
    //respond to keypress events only when the game starts(gamePlaying is a flag set inside the game object)
    if(game.gamePlaying == true) {
        if (key === 'left' && this.x > 101) {
            this.x -= 101;
        } else if (key === 'right' && this.x < 404) {
            this.x += 101;
        } else if (key === 'up' && this.y > 0) {
            this.y -= 83;
        } else if (key === 'down' && this.y < 400) {
            this.y += 83;
        }
    }
}

//Reset the player to its starting position once the character is hit by the bugs
Player.prototype.reset = function() {
    this.x = 5;
    this.y = 410;
}

//Create the object literal for the Game object (Constructor and Prototype not required since this is a Singleton object, no multiple instances of the object)
var game = {
    gamePlaying: false,
    gameStart: function(btnElem) {
        this.gamePlaying = true;
        // Place all enemy objects in an array called allEnemies
        allEnemies.push(enemy1);
        allEnemies.push(enemy2);
        allEnemies.push(enemy3);
        allEnemies.push(enemy4);
        //reset score to 0
        player.resetScore();

        game.startTimer(30,"status");
        btnElem.innerHTML = "Restart the game";
        btnElem.disabled = true;
    },
    startTimer: function(secs,elem) {
        //run the timer once every second(1000 ms)
        var timer = setTimeout(function(){
            game.countdown(secs,elem);
        },1000);
    },
    countdown: function(secs,elem) {
        //status element
        var element = document.getElementById(elem);
        var btnElem = document.getElementById("startBtn");

        element.innerHTML = "Time remaining: " + secs + "seconds";
        element.setAttribute("class", "status");

        secs--;
        //time is up = game is over, pass the state variable gameEnded = true to the gameStart funtion
        if(secs < 0) {
            element.innerHTML = "Sorry,Game is over.";
            game.gameEnd();
        } else {
            game.startTimer(secs,elem);
        }
    },
    gameEnd: function() {
         //Emtpy the Array to stop the bugs from moving since game is over
        allEnemies = [];
        //bring the player back to the original position
        player.reset();
        this.gamePlaying = false;
        var btnElem = document.getElementById("startBtn");
        btnElem.innerHTML = "Restart the game";
        btnElem.disabled = false;
        btnElem.onclick = function() {
            game.gameStart(btnElem);
        }
    }
};

// Instantiate the player object
var player = new Player(5,410,15);

//Init the starting point of the enemy objects
var initxEnemy = -10;

//Instantiate the enemy objects
var enemy1 = new Enemy(initxEnemy,40,50);
var enemy2 = new Enemy(initxEnemy,90,100);
var enemy3 = new Enemy(initxEnemy,100,150);
var enemy4 = new Enemy(initxEnemy,130,130);
//Intialize the array
var allEnemies = [];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

