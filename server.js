const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const config = require('./config');

const app = express();
const port = config.appPort || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port
});

connection.connect();

// API calls
app.get('/api/game/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  connection.query(`SELECT * FROM games WHERE id = ${gameId};`, function (error, results) {
    if (error) throw error;
    res.send({ game: results[0] });
  });
});

app.get('/api/game/:gameId/questions', (req, res) => {
  const gameId = req.params.gameId;
  connection.query(
    `SELECT q.* FROM questions q JOIN games g ON q.game_id = g.id WHERE g.id = ${gameId};`,
    function (error, results) {
      if (error) throw error;
      res.send({ questions: results });
    });
});

app.get('/api/tokens', (req, res) => {
  connection.query('SELECT * FROM tokens;', function (error, results) {
    if (error) throw error;
    res.send({ tokens: results });
  });
});

app.get('/api/game/:gameId/question_tokens', (req, res) => {
  const gameId = req.params.gameId;
  connection.query(
    `
      SELECT * FROM question_tokens qt 
      JOIN questions q ON qt.question_id = q.id 
      WHERE q.id IN 
        (
          SELECT q.id 
          FROM questions q 
          JOIN games g ON q.game_id = g.id 
          WHERE g.id = ${gameId}
         );
    `, function (error, results) {
      if (error) throw error;
      res.send({ questionTokens: results });
    });
});

if (config.nodeEnv === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console

process.on('SIGINT', function () {
  connection.end();
  process.exit();
});