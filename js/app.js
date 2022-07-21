// global game state object that will be updated throughout the game. Right now initialized with default values

function startGame() {
  window.gameState = {
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
    currentPlayer: null,
  };
  characterSelect();
}

document.getElementsByTagName("button")[0].addEventListener("click", () => {
  startGame();
});
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
  // let currPlayerIndex = 0;
  gameState.currentPlayer = gameState.players[Math.floor(Math.random() * 4)];
  document.getElementById("root").innerHTML = `
    <h1>Player ${gameState.currentPlayer.id}, pick a card!</h1>
    <div class="game-container">
      <div id="game">
      </div>
    </div>
  `;
  console.log(gameState);
  const cardDivs = new Array(16).fill(`
    <div class="game-card"></div>
  `);
  cardDivs.forEach(
    (card) => (document.getElementById("game").innerHTML += card)
  );
  function handleCardClick(e) {
    const cardId = e.target.getAttribute("id").substring(4);
    // console.log(gameState.currentPlayer);
    // console.log(cardId);
    gameState.stackedDeck.forEach((card) => {
      if (card.id == cardId) {
        card.isFlipped = true;
        if (card.isBad) {
          alert(
            `Player ${gameState.currentPlayer.id} has flipped a bad card and is out`
          );
          gameState.currentPlayer.isAlive = false;
          e.target.setAttribute("class", "bad");
        } else {
          e.target.setAttribute("class", "good");
        }
      }
    });
    if (
      gameState.players.indexOf(gameState.currentPlayer) ===
      gameState.players.length - 1
    ) {
      gameState.currentPlayer = gameState.players[0];
    } else {
      gameState.currentPlayer =
        gameState.players[
          gameState.players.indexOf(gameState.currentPlayer) + 1
        ];
    }

    document.getElementById(
      "root"
    ).firstElementChild.textContent = `Player ${gameState.currentPlayer.id}, pick a card!`;
    gameState.players = gameState.players.filter(
      (player) => player.isAlive === true
    );
    console.log(gameState);
    if (gameState.players.length === 1) {
      alert(`Player ${gameState.currentPlayer.id} has won!`);
      document.getElementById("root").innerHTML = `
      <button onclick='startGame()'>Play again</button>
      `;
    }
  }
  document.querySelectorAll(".game-card").forEach((element, index) => {
    element.setAttribute("id", `card${index + 1}`);
    element.addEventListener("click", handleCardClick);
  });
}
