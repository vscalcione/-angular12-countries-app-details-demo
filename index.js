const fs = require('fs');
const http = require('http');
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 8080;

const app = express();
const headquarters = fs.readFileSync(`${__dirname}/headquarters.json`, 'utf-8');
const url = 'http://us-central1-job-interview-cfe5a.cloudfunctions.net/countries/';
const options = {
    headers: {
        'Authorization': 'Basic ZGV2ZWxvcGVyOm1ldGlkZQ==',
        'Access-Control-Allow-Origin': '*'
    }
};

let countries = '';
http.get(url, options, (res) => {
    res.on('data', data => {
        countries += data.toString();
    })
});

app.use(cors({ origin: 'http://localhost:4200' }));

app.get('/headquarters', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.send(headquarters);
})

app.get('/countries', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(countries);    
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
})