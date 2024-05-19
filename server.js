const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

class FootballGame {
    constructor() {
        this.startYardLine = 25;
        this.yardsToTouchdown = 100 - this.startYardLine;
        this.down = 1;
        this.gameOver = false;
        this.playOptions = {
            "1": { name: "HB Dive (run)", func: this.hbDive.bind(this) },
            "2": { name: "Quick Toss (run)", func: this.quickToss.bind(this) },
            "3": { name: "Double Post (pass)", func: this.doublePost.bind(this) },
            "4": { name: "PA Y Cross (pass)", func: this.paYCross.bind(this) },
        };
    }

    play(choice) {
        const { name, func } = this.playOptions[choice] || {};
        if (!func) {
            return "Invalid choice.";
        }
        const result = func();
        return this.processResult(choice, name, result);
    }

    processResult(choice, name, result) {
        if (result === "interception" || result === "fumble") {
            this.gameOver = true;
            return `You chose ${name}. Oh no! ${result === "interception" ? "The pass was intercepted" : "The ball was fumbled"}. Game over.`;
        }

        this.yardsToTouchdown -= result;
        if (this.yardsToTouchdown <= 0) {
            this.gameOver = true;
            return `You chose ${name}. You gained ${result} yards. Touchdown! You win!`;
        }

        if (result >= 10) {
            this.down = 1;
        } else {
            this.down += 1;
        }

        if (this.down > 4) {
            this.gameOver = true;
            return "You turned the ball over on downs. Game over.";
        }

        return `You chose ${name}. You gained ${result} yards. Down: ${this.down}, Yards to Touchdown: ${this.yardsToTouchdown}`;
    }

    hbDive() {
        return this.calculateOutcome([0.10, 0.25, 0.35, 0.65, 0.85], [-3, 0, 5, 10, 20]);
    }

    quickToss() {
        return this.calculateOutcome([0.10, 0.25, 0.45, 0.65, 0.85], [-3, 0, 5, 10, 20]);
    }

    doublePost() {
        return this.calculateOutcome([0.10, 0.15, 0.40, 0.65, 0.90], [-1, 0, 15, 25, 36]);
    }

    paYCross() {
        return this.calculateOutcome([0.15, 0.20, 0.45, 0.65, 0.85], [-1, 0, 15, 25, 36]);
    }

    calculateOutcome(chances, gains) {
        const outcome = Math.random();
        if (outcome < chances[0]) return "fumble";
        if (outcome < chances[1]) return gains[0];
        if (outcome < chances[2]) return gains[1];
        if (outcome < chances[3]) return gains[2];
        if (outcome < chances[4]) return gains[3];
        return gains[4];
    }
}

app.use(express.json());

app.get('/frame', (req, res) => {
    const { choice, down = 1, yardsToTouchdown = 75 } = req.query;
    const game = new FootballGame();
    game.down = parseInt(down);
    game.yardsToTouchdown = parseInt(yardsToTouchdown);
    let message = "Welcome to the Football Game! Click 'Start Game' to begin.";

    if (choice) {
        message = game.play(choice);
    }

    let buttons = `
        <meta property="fc:frame:button:1" content="HB Dive (run)" />
        <meta property="fc:frame:button:2" content="Quick Toss (run)" />
        <meta property="fc:frame:button:3" content="Double Post (pass)" />
        <meta property="fc:frame:button:4" content="PA Y Cross (pass)" />
    `;

    if (game.gameOver) {
        buttons = `<meta property="fc:frame:button:1" content="Play Again" />`;
    }

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="http://yourdomain.com/game.png" />
            ${buttons}
        </head>
        <body>
            <p>${message}</p>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

class FootballGame {
    constructor() {
        this.startYardLine = 25;
        this.yardsToTouchdown = 100 - this.startYardLine;
        this.down = 1;
        this.gameOver = false;
        this.playOptions = {
            "1": { name: "HB Dive (run)", func: this.hbDive.bind(this) },
            "2": { name: "Quick Toss (run)", func: this.quickToss.bind(this) },
            "3": { name: "Double Post (pass)", func: this.doublePost.bind(this) },
            "4": { name: "PA Y Cross (pass)", func: this.paYCross.bind(this) },
        };
    }

    play(choice) {
        const { name, func } = this.playOptions[choice] || {};
        if (!func) {
            return "Invalid choice.";
        }
        const result = func();
        return this.processResult(choice, name, result);
    }

    processResult(choice, name, result) {
        if (result === "interception" || result === "fumble") {
            this.gameOver = true;
            return `You chose ${name}. Oh no! ${result === "interception" ? "The pass was intercepted" : "The ball was fumbled"}. Game over.`;
        }

        this.yardsToTouchdown -= result;
        if (this.yardsToTouchdown <= 0) {
            this.gameOver = true;
            return `You chose ${name}. You gained ${result} yards. Touchdown! You win!`;
        }

        if (result >= 10) {
            this.down = 1;
        } else {
            this.down += 1;
        }

        if (this.down > 4) {
            this.gameOver = true;
            return "You turned the ball over on downs. Game over.";
        }

        return `You chose ${name}. You gained ${result} yards. Down: ${this.down}, Yards to Touchdown: ${this.yardsToTouchdown}`;
    }

    hbDive() {
        return this.calculateOutcome([0.10, 0.25, 0.35, 0.65, 0.85], [-3, 0, 5, 10, 20]);
    }

    quickToss() {
        return this.calculateOutcome([0.10, 0.25, 0.45, 0.65, 0.85], [-3, 0, 5, 10, 20]);
    }

    doublePost() {
        return this.calculateOutcome([0.10, 0.15, 0.40, 0.65, 0.90], [-1, 0, 15, 25, 36]);
    }

    paYCross() {
        return this.calculateOutcome([0.15, 0.20, 0.45, 0.65, 0.85], [-1, 0, 15, 25, 36]);
    }

    calculateOutcome(chances, gains) {
        const outcome = Math.random();
        if (outcome < chances[0]) return "fumble";
        if (outcome < chances[1]) return gains[0];
        if (outcome < chances[2]) return gains[1];
        if (outcome < chances[3]) return gains[2];
        if (outcome < chances[4]) return gains[3];
        return gains[4];
    }
}

app.use(express.json());

// Serve the root URL with the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/frame', (req, res) => {
    const { choice, down = 1, yardsToTouchdown = 75 } = req.query;
    const game = new FootballGame();
    game.down = parseInt(down);
    game.yardsToTouchdown = parseInt(yardsToTouchdown);
    let message = "Welcome to the Football Game! Click 'Start Game' to begin.";

    if (choice) {
        message = game.play(choice);
    }

    let buttons = `
        <meta property="fc:frame:button:1" content="HB Dive (run)" />
        <meta property="fc:frame:button:2" content="Quick Toss (run)" />
        <meta property="fc:frame:button:3" content="Double Post (pass)" />
        <meta property="fc:frame:button:4" content="PA Y Cross (pass)" />
    `;

    if (game.gameOver) {
        buttons = `<meta property="fc:frame:button:1" content="Play Again" />`;
    }

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="http://yourdomain.com/game.png" />
            ${buttons}
        </head>
        <body>
            <p>${message}</p>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
