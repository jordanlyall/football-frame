const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the root URL with Open Graph tags
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
        </head>
        <body>
            <p>Welcome to the Football Game! Click 'Start Game' to begin.</p>
        </body>
        </html>
    `;
    console.log(htmlResponse); // Log the response to verify
    res.send(htmlResponse);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
