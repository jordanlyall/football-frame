const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the initial frame with Open Graph tags
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
                <div id="game-status">Welcome to the Football Game! Click 'Start Game' to begin.</div>
                <div id="play-options">
                    <button onclick="window.location.href='/frame/start-game'">Start Game</button>
                </div>
            </div>
        </body>
        </html>
    `;
    res.send(htmlResponse);
});

// Frame endpoint to handle game start
app.get('/frame/start-game', (req, res) => {
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
                <div id="game-status">Choose your play:</div>
                <div id="play-options">
                    <button onclick="window.location.href='/frame/play?choice=1'">HB Dive (run)</button>
                    <button onclick="window.location.href='/frame/play?choice=2'">Quick Toss (run)</button>
                    <button onclick="window.location.href='/frame/play?choice=3'">Double Post (pass)</button>
                    <button onclick="window.location.href='/frame/play?choice=4'">PA Y Cross (pass)</button>
                </div>
            </div>
        </body>
        </html>
    `;
    res.send(htmlResponse);
});

// Frame endpoint to handle play choice and return updated frame
app.get('/frame/play', (req, res) => {
    const { choice } = req.query;
    const game = new FootballGame();
    const message = game.makePlay(choice);

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
                <div id="play-options">
                    <button onclick="window.location.href='/frame/play?choice=1'">HB Dive (run)</button>
                    <button onclick="window.location.href='/frame/play?choice=2'">Quick Toss (run)</button>
                    <button onclick="window.location.href='/frame/play?choice=3'">Double Post (pass)</button>
                    <button onclick="window.location.href='/frame/play?choice=4'">PA Y Cross (pass)</button>
                </div>
            </div>
        </body>
        </html>
    `;
    res.send(htmlResponse);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
