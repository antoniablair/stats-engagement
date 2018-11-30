const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mysql = require('mysql');
const config = require('./config');
// import config from 'config';

// TODO: use only import 

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database,
});

connection.connect();

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/game/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  connection.query(`SELECT * FROM games WHERE id = ${gameId};`, function (error, results, fields) {
    if (error) throw error;
    res.send({ games: results });
  });
});

app.get('/api/questions/', (req, res) => {
  connection.query(
    `SELECT * FROM questions;`, 
  function (error, results, fields) {
    if (error) throw error;
    res.send({ questions: results });
  });
  // connection.end();
});

app.get('/api/tokens', (req, res) => {
  connection.query('SELECT * FROM tokens;', function (error, results, fields) {
    if (error) throw error;
    res.send({ tokens: results });
  });
});

app.get('/api/question_tokens', (req, res) => {
  connection.query(`SELECT * FROM question_tokens`, function (error, results, fields) {
    if (error) throw error;
    res.send({ questionTokens: results });
  });
});

app.get('/api/pets', function (req, res) {
  connection.connect();

  connection.query('SELECT * FROM pet', function (error, results, fields) {
    if (error) throw error;
    res.send({ pets: results });
  });
  connection.end();
});

app.post('/api/world', (req, res) => {
  console.log('WORLD');
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

process.on('SIGINT', function() {
	connection.end();
    listeners = process.listeners('SIGINT');
    process.exit();
});