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
// let counter = 0;

function startGame(text) {
  //   counter++;
  console.log(gameState.players[0].name);
  //   if (counter === 2) {
  //     counter = 0;
  //     // this is basically to provide a base case to break out of the recursive call I'm making with setTimeout
  //     return true;
  //   }
  document.getElementById("root").textContent = text;
  characterSelect();
  //   setTimeout(() => {
  //     startGame("again");
  //     gameState.players[0].name = "Usman";
  //     console.log(gameState.players[0].name);
  //   }, 3000);
  //   setTimeout(characterSelect, 8000);
}

function characterSelect() {
  document.getElementById("root").innerHTML = `
    <h1 class="red">Choose your player!</h1>
    <p>What's your name??</p>
  `;
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
  gameState.stackedDeck = gameState.stackedDeck.map((card, index) => {
    return { ...card, id: index + 1 };
  });
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
