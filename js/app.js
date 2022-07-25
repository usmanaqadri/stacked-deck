window.onload = () => {
  document.getElementById("root").innerHTML = `
  <button onclick="startGame()">Start</button>
  `;
};

function startGame() {
  // When we start the game, we want to create our global game state object that will be updated throughout the game. Right now initialized with default values
  window.gameState = {
    players: [
      {
        id: 1,
        designation: "Player 1",
        name: "",
        isHuman: true,
        isAlive: true,
      },
      {
        id: 2,
        designation: "Player 2",
        name: "",
        isHuman: false,
        isAlive: true,
      },
      {
        id: 3,
        designation: "Player 3",
        name: "",
        isHuman: false,
        isAlive: true,
      },
      {
        id: 4,
        designation: "Player 4",
        name: "",
        isHuman: false,
        isAlive: true,
      },
    ],
    stackedDeck: new Array(16).fill({
      id: null,
      isBad: false,
    }),
    currentPlayer: null,
  };
  document.getElementById("root").classList.remove("gameboard");
  characterSelect();
}

function characterSelect() {
  document.getElementById("root").innerHTML = `
  <audio src="./assets/music/character0.mp3" id="character-music"></audio>
  <audio loop src="./assets/music/character1.mp3" id="character-music1"></audio>
  <audio src = "" id="character-select"></audio>
  <h1 class="character-select-header">Choose your player!</h1>
    <h2 id="current-select">Player 1 select:</h2>
    <div class="character-grid">
        <div id="mario-box" class="box"><p>Mario</p></div>
        <div id="dk-box" class="box"><p>DK</p></div>
        <div id="link-box" class="box"><p>Link</p></div>
        <div id="fox-box" class="box"><p>Fox</p></div>
        <div id="yoshi-box" class="box"><p>Yoshi</p></div>
        <div id="pikachu-box" class="box"><p>Pikachu</p></div>
        <div id="kirby-box" class="box"><p>Kirby</p></div>
        <div id="samus-box" class="box"><p>Samus</p></div>
    </div>
    <div class="player-grid">
        <div class="box2">
          <p contentEditable="true">Player 1</p>
          <img class="blackbox" height = "100px" src="./assets/blackbox.jpg"/>
        </div>
        <div class="box2">
          <p contentEditable="true">Player 2</p> 
          <img class="blackbox" height = "100px" src="./assets/blackbox.jpg"/>
        </div>
        <div class="box2">
          <p contentEditable="true">Player 3</p>
          <img class="blackbox" height = "100px" src="./assets/blackbox.jpg"/>
        </div>
        <div class="box2">
          <p contentEditable="true">Player 4</p>
          <img class="blackbox" height = "100px" src="./assets/blackbox.jpg"/>
        </div>
    </div>
  `;
  document.getElementById("character-music").play();
  document.getElementById("character-music").onended = function () {
    document.getElementById("character-music1").play();
  };
  // this is how we add click events when we select the characters
  const characterDivs = document
    .querySelector(".character-grid")
    .querySelectorAll("div");
  characterDivs.forEach((div, index) => {
    div.setAttribute("data-key", `${index}`);
    div.addEventListener("mouseover", handleHover);
    div.addEventListener("mouseout", handleLeave);
    div.addEventListener("click", handleClick);
  });

  // this counter is how we're going to update Player 1-4s character selection when we click
  let counter = 1;
  function handleHover(e) {
    const playerDivs = document
      .querySelector(".player-grid")
      .querySelectorAll("div");
    playerDivs[counter - 1].querySelector(
      "img"
    ).src = `./assets/characters/${e.target.innerText.toLowerCase()}.webp`;
    playerDivs[counter - 1].querySelector("img").classList.remove("blackbox");
    playerDivs[counter - 1].querySelector("img").classList.add("move");
  }
  function handleLeave() {
    const currBox = document
      .querySelector(".player-grid")
      .querySelectorAll("div")
      [counter - 1].querySelector("img");
    currBox.src = "./assets/blackbox.jpg";
    currBox.classList.add("blackbox");
  }
  function handleClick(e) {
    // handleLeave();
    if (counter <= 4) {
      document.getElementById(
        "character-select"
      ).src = `./assets/music/${e.target.firstElementChild.innerHTML.toLowerCase()}.mp3`;
      document.getElementById("character-select").play();
      document.getElementById("current-select").textContent = `Player ${
        counter + 1
      } select:`;
      if (counter === 4) {
        // adding event listener that can only be clicked once
        // https://stackoverflow.com/questions/3723914/remove-eventlistener-in-javascript-after-event-occurred
        document.addEventListener("keyup", handleEnter, { once: true });

        document.getElementById("current-select").innerHTML = `
          <h2>Press Enter to start playing!</h2>
        `;

        // removing mouseover and out event listeners so no more errors
        const characterDivs = document
          .querySelector(".character-grid")
          .querySelectorAll("div");
        characterDivs.forEach((div) => {
          div.removeEventListener("mouseover", handleHover);
          div.removeEventListener("mouseout", handleLeave);
        });
      }
      gameState.players.forEach((player) => {
        if (player.id === counter) {
          player.name = e.target.firstElementChild.innerHTML;
        }
      });
      const playerDivs = document
        .querySelector(".player-grid")
        .querySelectorAll("div");
      playerDivs[counter - 1].querySelector(
        "img"
      ).src = `./assets/characters/${e.target.innerText.toLowerCase()}.webp`;
      playerDivs[counter - 1]
        .querySelector("img")
        .classList.remove("move", "blackbox");
      counter++;
    } else {
      // console.log(e.target);
    }
  }
  function handleEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const playerBoxes = document.querySelectorAll(".box2");
      playerBoxes.forEach(
        (player, index) =>
          (gameState.players[index].designation =
            player.firstElementChild.innerText)
      );
      playGame();
    }
  }

  generateCards();
}

function generateCards() {
  //   this is to reset it if I need to run generateCards again
  gameState.stackedDeck = new Array(16).fill({
    id: null,
    isBad: false,
  });
  //   this code below is to assign each of the 16 cards its unique ID
  gameState.stackedDeck = gameState.stackedDeck.map((card, index) => {
    return { ...card, id: index + 1 };
  });
  //   this code below uses the returned array sixRandNums() to make only the cards with a corresponding ID become bad
  const cardsToTurnBad = sixRandNums();
  gameState.stackedDeck.forEach((card) => {
    if (cardsToTurnBad.includes(card.id)) {
      gameState.stackedDeck[card.id - 1].isBad = true;
    }
  });
}

// this function returns an array of six unique integers from 1-16
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
  // this randomizes which player goes first
  gameState.currentPlayer = gameState.players[Math.floor(Math.random() * 4)];

  // this renders our root with the gameboard
  document.getElementById("root").innerHTML = `
  <audio src="./assets/music/stage0.mp3" id="stage-music"></audio>
  <audio loop src="./assets/music/stage1.mp3" id="stage-music1"></audio>
  <h1>${gameState.currentPlayer.designation}, pick a card!</h1>
  <div class="game-container">
  <div id="game">
  </div>
  </div>
  `;
  document.getElementById("stage-music").play();
  document.getElementById("stage-music").onended = function () {
    document.getElementById("stage-music1").play();
  };
  document.getElementById("root").classList.add("gameboard");
  // so we don't have to see 16 lines of the same thing
  const cardDivs = new Array(16).fill(`
  <div class="game-card"></div>
  `);
  cardDivs.forEach(
    (card) => (document.getElementById("game").innerHTML += card)
  );
  // this gives each rendered card div its unique ID
  document.querySelectorAll(".game-card").forEach((element, index) => {
    element.setAttribute("id", `card${index + 1}`);
    element.addEventListener("click", handleCardClick, { once: true });
  });

  function handleCardClick(e) {
    // this strips the clicked cards ID to just the number
    e.target.classList.add("flipcard");
    const cardId = e.target.getAttribute("id").substring(4);

    gameState.stackedDeck.forEach((card) => {
      if (card.id == cardId) {
        if (card.isBad) {
          alert(
            `${gameState.currentPlayer.designation} has flipped a bad card and has been eliminated.`
          );
          gameState.currentPlayer.isAlive = false;
          e.target.setAttribute("class", "bad");
        } else {
          e.target.setAttribute("class", "good");
        }
      }
    });
    // this is to set currentPlayer to the next person in the sequence.
    if (
      // we want to use indexOf and length because this array may change if a player is eliminated
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

    document
      .getElementById("root")
      .querySelector(
        "h1"
      ).textContent = `${gameState.currentPlayer.designation}, pick a card!`;

    // this is to update our gameState object to have only players still alive
    gameState.players = gameState.players.filter(
      (player) => player.isAlive === true
    );

    // when only one person left, they have won the game
    if (gameState.players.length === 1) {
      document
        .getElementById("root")
        .querySelector(
          "h1"
        ).textContent = `${gameState.currentPlayer.designation} has won!`;

      // removed board and give option to play again
      document.getElementById("root").lastElementChild.innerHTML = `
      <img class="victor-move" height = "200px" src="./assets/characters/${gameState.players[0].name.toLowerCase()}.webp"/>
      <button class="play-again" onclick='startGame()'>Play again</button>
      `;
    }
  }
}
