// global game state object that will be updated throughout the game. Right now initialized with default values

const gameState = {
  players: [
    {
      id: 1,
      name: "",
      isHuman: true,
      isAlive: true,
    },
    {
      id: 2,
      name: "",
      isHuman: false,
      isAlive: true,
    },
    {
      id: 3,
      name: "",
      isHuman: false,
      isAlive: true,
    },
    {
      id: 4,
      name: "",
      isHuman: false,
      isAlive: true,
    },
  ],
  stackedDeck: new Array(16).fill({
    id: null,
    isBad: false,
    isFlipped: false,
  }),
};

function startGame() {
  characterSelect();
}

function characterSelect() {
  document.getElementById("root").innerHTML = `
    <h1 class="red">Choose your player!</h1>
    <h2 id="current-select">Player 1 select:</h2>
    <div class="character-grid">
        <div class="box">Mario</div>
        <div class="box">DK</div>
        <div class="box">Link</div>
        <div class="box">Fox</div>
        <div class="box">Yoshi</div>
        <div class="box">Pikachu</div>
        <div class="box">Kirby</div>
        <div class="box">Samus</div>
    </div>
    <div class="player-grid">
        <div class="box2">Player 1: </div>
        <div class="box2">Player 2: </div>
        <div class="box2">Player 3: </div>
        <div class="box2">Player 4: </div>
    </div>
  `;

  const characterDivs = document
    .querySelector(".character-grid")
    .querySelectorAll("div");

  characterDivs.forEach((div) => div.addEventListener("click", handleClick));

  // this counter is how we're going to update Player 1-4s character selection
  let counter = 1;
  function handleEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      playGame();
    }
  }
  function handleClick(e) {
    if (counter <= 4) {
      document.getElementById("current-select").textContent = `Player ${
        counter + 1
      } select:`;
      if (counter === 4) {
        document.addEventListener("keyup", handleEnter);
        document.getElementById("current-select").innerHTML = `
          <h2>Press Enter to start playing!</h2>
        `;
      }
      gameState.players.forEach((player) => {
        if (player.id === counter) {
          player.name = e.target.innerHTML;
        }
      });
      const playerDivs = document
        .querySelector(".player-grid")
        .querySelectorAll("div");
      playerDivs[counter - 1].innerHTML += "<br/>" + e.target.innerHTML;
      counter++;
    } else {
      console.log("e.target.innerHTML");
    }

    //   gameState.players.forEach((player) => {
    //     if (player.id === index + 1) {
    //       player.name = e.target.innerHTML;
    //     }
    //   });
  }

  generateCards();
}

document.getElementsByTagName("button")[0].addEventListener(
  "click",
  (e) => {
    startGame("Hello");
  },
  { once: true }
);

function generateCards() {
  //   this is to reset it if I need to run generateCards again
  gameState.stackedDeck = new Array(16).fill({
    id: null,
    isBad: false,
    isFlipped: false,
  });
  const cardsToTurnBad = sixRandNums();
  //   this code below is to assign each card object its unique ID
  gameState.stackedDeck = gameState.stackedDeck.map((card, index) => {
    return { ...card, id: index + 1 };
  });
  //   this code below makes the matching card object from the sixRandNums() to be BAD
  gameState.stackedDeck.forEach((card) => {
    if (cardsToTurnBad.includes(card.id)) {
      gameState.stackedDeck[card.id - 1].isBad = true;
    }
  });
}

function sixRandNums() {
  const resultArr = [];
  while (resultArr.length !== 6) {
    const randNum = Math.floor(Math.random() * 16) + 1;
    if (!resultArr.includes(randNum)) {
      resultArr.push(randNum);
    }
  }
  return resultArr;
}

function playGame() {
  document.getElementById("root").innerHTML = `
    <h1>START!</h1>
  `;
}
