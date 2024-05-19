const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the root URL with Open Graph tags and the game HTML
app.get('/', (req, res) => {
    const htmlResponse = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="og:title" content="Football Game" />
            <meta property="og:description" content="Play the exciting football game!" />
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://football-frame.vercel.app/images/frameCover.png" />
            <meta property="fc:frame:button:1" content="Start Game" />
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <div id="game-container">
                <h1>Football Game</h1>
                <div id="game-status"></div>
                <div id="play-options">
                    <button onclick="startGame()">Start Game</button>
                </div>
            </div>
            <script src="/game.js"></script>
        </body>
        </html>
    `;
    res.send(htmlResponse);
});

app.get('/frame', (req, res) => {
    const { choice } = req.query;
    let message = "Welcome to the Football Game! Click 'Start Game' to begin.";

    if (choice) {
        const game = new FootballGame();
        message = game.makePlay(choice);
    }

    const htmlResponse = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://football-frame.vercel.app/images/frameCover.png" />
            <meta property="fc:frame:button:1" content="HB Dive (run)" />
            <meta property="fc:frame:button:2" content="Quick Toss (run)" />
            <meta property="fc:frame:button:3" content="Double Post (pass)" />
            <meta property="fc:frame:button:4" content="PA Y Cross (pass)" />
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <div id="game-container">
                <h1>Football Game</h1>
                <div id="game-status">${message}</div>
            </div>
            <script src="/game.js"></script>
        </body>
        </html>
    `;
    res.send(htmlResponse);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
