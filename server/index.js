const absentCongress = require('./data/absent_congress.json');
const absentSenate = require('./data/absent_senate.json');
const bravestCongress = require('./data/bravest_congress.json');
const bravestSenate = require('./data/bravest_senate.json');

const express = require('express');
const app = express();

const port = 5000;

//for dev and test
app.get('/api/worst/congress', (req, res) => {
    res.json(absentCongress);
});

app.get('/api/worst/senate', (req, res) => {
    res.json(absentSenate);
});

app.get('/api/best/congress', (req, res) => {
    res.json(bravestCongress);
});

app.get('/api/best/senate', (req, res) => {
    res.json(bravestSenate);
});

// for production
app.get('/worst/congress', (req, res) => {
    res.json(absentCongress);
});

app.get('/worst/senate', (req, res) => {
    res.json(absentSenate);
});

app.get('/best/congress', (req, res) => {
    res.json(bravestCongress);
});

app.get('/best/senate', (req, res) => {
    res.json(bravestSenate);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
