const express = require('express');
const cors = require('cors');
const app = express();
const hjson = require('hjson');
require('dotenv').config();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL_PROD
        : process.env.FRONTEND_URL_DEV,
};

app.use(cors(corsOptions));
app.use(express.json()); // to parse JSON bodies into req.body
app.get('/', (req, res) => {
    res.send({ message: 'home' });
});

app.post('/hjson/minify', (req, res) => {
    const input = req.body.input;
    if (!input) {
        return res.status(400).send({ error: 'Missing "input" field' });
    }
    try {
        const parsed = hjson.parse(input);
        const minified = JSON.stringify(parsed);
        res.json({ result: minified });
    } catch (err) {
        res.status(400).json({ error: 'Invalid HJSON: ' + err.message });
    }
});

app.post('/hjson/beautify', (req, res) => {
    const input = req.body.input;
    if (!input) {
        return res.status(400).send({ error: 'Missing "input" field' });
    }
    try {
        const parsed = hjson.parse(input);
        const beautified = hjson.stringify(parsed, { space: 2 });
        res.json({ result: beautified });
    } catch (err) {
        res.status(400).json({ error: 'Invalid HJSON: ' + err.message });
    }
});

app.post('/hjson/beautifyWithDelay', async (req, res) => {
    const input = req.body.input;
    if (!input) {
        return res.status(400).send({ error: 'Missing "input" field' });
    }
    try {
        await delay(3000);
        const parsed = hjson.parse(input);
        const beautified = hjson.stringify(parsed, { space: 2 });
        res.json({ result: beautified });
    } catch (err) {
        res.status(400).json({ error: 'Invalid HJSON: ' + err.message });
    }
});

const PORT = process.env.BACKEND_PORT || 3001;
app.listen(PORT, () => console.log('Backend running on port', PORT));