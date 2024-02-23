const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');

const app = express();
const port = 3000;

function interpretMood(score) {
  if (score > 0.5) return 5;
    if (score > 0) return 4;
    if (score === 0) return 3;
    if (score > -0.5) return 2;
    return 1;
}
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");
// Initialize the sentiment analysis classifier
//const classifier = new natural.BayesClassifier();
//classifier.addDocument('I love this product!', 'positive');
//classifier.addDocument('This product is terrible.', 'negative');
//classifier.train();


// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API endpoint for sentiment analysis
app.post('/analyzeSentiment', (req, res) => {
    const text = req.body.text;

    // Perform sentiment analysis
    const sentiment = analyzer.getSentiment(text.split(" "));
    const mood = interpretMood(sentiment)
    console.log("Backend calc:",mood)
    res.json({ mood });
});

//curl -X POST -H "Content-Type: application/json" -d '{"text": "I am extremely happy"}' http://10.128.128.128:3000/analyzeSentiment

// Start the server
app.listen(port,'0.0.0.0', () => {
    console.log(`Server is running!`);
});