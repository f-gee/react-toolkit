const express = require('express');
const cors = require('cors');
const app = express();
const hjson = require('hjson');
const { minify: minifyJs } = require('terser');
const beautifyJs = require('js-beautify').js;
const beautifyCss = require('js-beautify').css;
const CleanCSS = require('clean-css');
require('dotenv').config();

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

function requireInput(req, res) {
    const input = req.body.input;
    if (!input) {
        res.status(400).send({ error: 'Missing "input" field' });
        return null;
    }
    return input;
}

// JSON minify/beautify use the hjson parser so the input can be plain JSON
// *or* HJSON (comments, unquoted keys, trailing commas, etc). Output is
// always standard JSON.
app.post('/json/minify', (req, res) => {
    const input = requireInput(req, res);
    if (input === null) return;
    try {
        const parsed = hjson.parse(input);
        res.json({ result: JSON.stringify(parsed) });
    } catch (err) {
        res.status(400).json({ error: 'Invalid JSON/HJSON: ' + err.message });
    }
});

app.post('/json/beautify', (req, res) => {
    const input = requireInput(req, res);
    if (input === null) return;
    try {
        const parsed = hjson.parse(input);
        res.json({ result: JSON.stringify(parsed, null, 2) });
    } catch (err) {
        res.status(400).json({ error: 'Invalid JSON/HJSON: ' + err.message });
    }
});

app.post('/js/minify', async (req, res) => {
    const input = requireInput(req, res);
    if (input === null) return;
    try {
        const result = await minifyJs(input);
        if (!result.code) {
            throw new Error('Minification produced no output');
        }
        res.json({ result: result.code });
    } catch (err) {
        res.status(400).json({ error: 'Invalid JS: ' + err.message });
    }
});

app.post('/js/beautify', (req, res) => {
    const input = requireInput(req, res);
    if (input === null) return;
    try {
        const result = beautifyJs(input, { indent_size: 2 });
        res.json({ result });
    } catch (err) {
        res.status(400).json({ error: 'Invalid JS: ' + err.message });
    }
});

app.post('/css/minify', (req, res) => {
    const input = requireInput(req, res);
    if (input === null) return;
    const output = new CleanCSS().minify(input);
    if (output.errors.length) {
        return res.status(400).json({ error: 'Invalid CSS: ' + output.errors.join('; ') });
    }
    res.json({ result: output.styles });
});

app.post('/css/beautify', (req, res) => {
    const input = requireInput(req, res);
    if (input === null) return;
    try {
        const result = beautifyCss(input, { indent_size: 2 });
        res.json({ result });
    } catch (err) {
        res.status(400).json({ error: 'Invalid CSS: ' + err.message });
    }
});

app.post('/base64/encode', (req, res) => {
    const input = requireInput(req, res);
    if (input === null) return;
    try {
        res.json({ result: Buffer.from(input, 'utf-8').toString('base64') });
    } catch (err) {
        res.status(400).json({ error: 'Could not encode input: ' + err.message });
    }
});

app.post('/base64/decode', (req, res) => {
    const input = requireInput(req, res);
    if (input === null) return;
    try {
        const isValidBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(input.replace(/\s/g, ''));
        if (!isValidBase64) {
            throw new Error('Input is not valid base64');
        }
        res.json({ result: Buffer.from(input, 'base64').toString('utf-8') });
    } catch (err) {
        res.status(400).json({ error: 'Invalid base64: ' + err.message });
    }
});

const PORT = process.env.BACKEND_PORT || 3001;
app.listen(PORT, () => console.log('Backend running on port', PORT));