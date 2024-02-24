const express = require('express');
const bodyParser = require('body-parser');
const vader = require('vader-sentiment');

const app = express();
const port = 3000;

function interpretMood(score) {
  if (score >= 0.8) return 5;
    if (score > 0.4) return 4;
    if (score > -0.4) return 3;
    if (score <= -0.4 && score >-0.8) return 2;
    return 1;
}

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API endpoint for sentiment analysis
app.post('/analyzeSentiment', async (req, res) => {
    const text = req.body.text;

    // Perform sentiment analysis    
    const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text)
    const mood=interpretMood(intensity.compound)

    res.json({ mood });
});

// Start the server
app.listen(port,'0.0.0.0', () => {
    console.log(`Server is running!`);
});