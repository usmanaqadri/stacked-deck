# stacked-deck
stacked cards

## Project Description
Turn-based game. There are a stack of cards with good cards and then there are a few bad cards shuffled in it. The cards are flipped over and arranged in a grid. If you choose a bad card you lose. Last one standing is the winner. 

Trying to recreate THIS: https://www.youtube.com/watch?v=WbsvW4voSIY

## Wire Frames

Selecting Character:

<img width="602" alt="b1a7c2ab-7bf3-4556-995d-7972e5bc55c6" src="https://user-images.githubusercontent.com/19939597/180606940-15526ec9-e31b-43a5-a52c-70d20624fd32.png">

Gameboard setup: 

<img width="605" alt="6762589a-560d-447e-a227-5d1d793bb49d" src="https://user-images.githubusercontent.com/19939597/180606951-f5b6f258-5956-45a8-b3d3-8079f9324533.png">

Midgame with cards flipped:

<img width="634" alt="e78478f0-4a12-45de-9551-f2c64d6858fb" src="https://user-images.githubusercontent.com/19939597/180606961-7c162df1-0ef3-4860-828e-3c67da8fe61d.png">

Game over:

<img width="627" alt="b286c03a-49cd-453a-a833-6e805be62d21" src="https://user-images.githubusercontent.com/19939597/180606982-f7d1c4ac-9dea-41bf-a7e8-29a69800751d.png">


## User Stories

As a player, I want to be able to choose my own unique character
As a player, I want to be able to select a difficulty level (more bad cards in the pile)
As a player, I should be able to click the card I want with the mouse to reveal it
As a player, I should NOT be able to click a card when it's another player/computer's turn
As a player, at the end of the game I want to be able to select rematch, change character, change difficulty



### Explanation of Tech
I essentially used a <div id="root"> to grab and update the innerHTML in each screen
Initialized a a global game state object in the beginning that would be updated with certain interactions

### Future improvements (in order of ease)
instead of using alert build my own custom pop-up when someone is out
add ability for computers to play
add a flip effect on the cards
have the cards appear faceup, and then shuffle animation, so it's more of a memory game than pure chance




### Stretch Goals
If you click a card, it should have a nice flip effect
Make it more complex with the addition of special cards that award an extra life
add background music
add a timer to decide 
add animation 
