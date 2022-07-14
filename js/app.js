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

const startGame = (text) => {
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
};

function characterSelect() {
  document.getElementById("root").textContent = "something else";
  generateCards();
}

startGame("Hello");

function generateCards() {
  gameState.stackedDeck = gameState.stackedDeck.map((card, index) => {
    return { ...card, id: index + 1 };
  });
}

function sixRandNums() {
  const resultArr = [];
  while (resultArr.length !== 4) {
    const randNum = Math.floor(Math.random() * 16) + 1;
    if (!resultArr.includes(randNum)) {
      resultArr.push(randNum);
    }
  }
  return resultArr;
}
