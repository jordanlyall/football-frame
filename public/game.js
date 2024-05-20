class FootballGame {
  constructor() {
      this.startYardLine = 25;
      this.yardsToTouchdown = 100 - this.startYardLine;
      this.down = 1;
      this.playOptions = {
          "1": { name: "HB Dive (run)", func: this.hbDive.bind(this) },
          "2": { name: "Quick Toss (run)", func: this.quickToss.bind(this) },
          "3": { name: "Double Post (pass)", func: this.doublePost.bind(this) },
          "4": { name: "PA Y Cross (pass)", func: this.paYCross.bind(this) },
      };
      this.gameOver = false;
  }

  hbDive() {
      const outcome = Math.random();
      if (outcome < 0.10) { return "fumble"; }
      else if (outcome < 0.25) { return -Math.floor(Math.random() * 3) - 1; }
      else if (outcome < 0.35) { return 0; }
      else if (outcome < 0.65) { return Math.floor(Math.random() * 4) + 2; }
      else if (outcome < 0.85) { return Math.floor(Math.random() * 5) + 6; }
      else { return Math.floor(Math.random() * 10) + 11; }
  }

  quickToss() {
      const outcome = Math.random();
      if (outcome < 0.10) { return "fumble"; }
      else if (outcome < 0.25) { return -Math.floor(Math.random() * 3) - 1; }
      else if (outcome < 0.45) { return 0; }
      else if (outcome < 0.65) { return Math.floor(Math.random() * 4) + 2; }
      else if (outcome < 0.85) { return Math.floor(Math.random() * 5) + 6; }
      else { return Math.floor(Math.random() * 10) + 11; }
  }

  doublePost() {
      const outcome = Math.random();
      if (outcome < 0.10) { return "interception"; }
      else if (outcome < 0.15) { return "fumble"; }
      else if (outcome < 0.40) { return 0; }
      else if (outcome < 0.65) { return Math.floor(Math.random() * 10) + 6; }
      else if (outcome < 0.90) { return Math.floor(Math.random() * 10) + 16; }
      else { return Math.floor(Math.random() * 11) + 26; }
  }

  paYCross() {
      const outcome = Math.random();
      if (outcome < 0.15) { return "interception"; }
      else if (outcome < 0.20) { return "fumble"; }
      else if (outcome < 0.45) { return 0; }
      else if (outcome < 0.65) { return Math.floor(Math.random() * 10) + 6; }
      else if (outcome < 0.85) { return Math.floor(Math.random() * 10) + 16; }
      else { return Math.floor(Math.random() * 11) + 26; }
  }

  makePlay(choice) {
      const play = this.playOptions[choice];
      if (!play) { return "Invalid choice. Try again."; }
      const result = play.func();
      if (result === "interception" || result === "fumble") {
          this.gameOver = true;
          return `You chose ${play.name}. Oh no! The pass was intercepted. Game over.`;
      }
      this.yardsToTouchdown -= result;
      if (this.yardsToTouchdown <= 0) {
          this.gameOver = true;
          return `You chose ${play.name}. You gained ${result} yards. Touchdown! You win!`;
      }
      if (result >= 10) { this.down = 1; } else { this.down += 1; }
      if (this.down > 4) {
          this.gameOver = true;
          return "You turned the ball over on downs. Game over.";
      }
      return `You chose ${play.name}. You gained ${result} yards. Down: ${this.down}, Yards to Touchdown: ${this.yardsToTouchdown}`;
  }
}

let game;

function startGame() {
  game = new FootballGame();
  document.getElementById('game-status').innerText = "Welcome to the Football Game! You start at the 25 yard line. Choose your plays wisely to score a touchdown. You have four downs to make it to the end zone. Good luck!";
  document.getElementById('play-options').innerHTML = `
      <button onclick="makePlay('1')">HB Dive (run)</button>
      <button onclick="makePlay('2')">Quick Toss (run)</button>
      <button onclick="makePlay('3')">Double Post (pass)</button>
      <button onclick="makePlay('4')">PA Y Cross (pass)</button>
  `;
}

function makePlay(choice) {
  const result = game.makePlay(choice);
  document.getElementById('game-status').innerText = result;
}
