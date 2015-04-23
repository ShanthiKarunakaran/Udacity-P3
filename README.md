frontend-nanodegree-arcade-game
===============================

Rubric : https://www.udacity.com/course/viewer/#!/c-nd001/l-2696458597/m-2687128535

Game rules:
Start the game by pressing the "Start Game" button.
Once the Start Game button is pressed, enemies appear across the canvas and the timer is set(to a countdown of 30secs).
Start moving the player up/down/left/right using the arrow keys in your keyboard. Control the player's movement such that it doesn't collide with the Enemies while the player is being moved in any direction.


Scoring Rules:
If the player reaches the water without any collision with the bugs(enemies):
	- The score is incremented each time the player manages to reach the water tile without colliding with any of the Enemies.
If the player collides with any of the Enemies:
 	- The player is reset back to the original square.
 	- And the score is decremented.

When is the game done? :
Once the timer of 30secs is over,
	- It means the player's game time is done
	- The player is brought back to the original tile position
	- Whatever the player has scored during the game, is displayed
	- A message "Sorry,Game is over." is also displayed indicating the player's time is up.

Restart the game:
The user can restart a new game by clicking the "Restart the Game" button.
	- Once again, the timer is started counting down from 30secs to 0.
The same game rules as above apply.

Resources:
http://www.html5canvastutorials.com/tutorials/html5-canvas-element/
Udacity : HTML5 Game development course https://www.udacity.com/course/viewer#!/c-cs255
http://www.webplatform.org/
http://www.phpied.com/3-ways-to-define-a-javascript-class/
http://www.ibm.com/developerworks/library/wa-oojavascript/
