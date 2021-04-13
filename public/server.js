// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

const path = require('path');
const express = require('express');
const app = express();

// DB
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, 'db/db.json'));
const db = low(adapter);

// server.use(middlewares);
// server.use(router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/static/*', (req, res) => {
  res.sendFile(path.join(__dirname, req.url));
});

app.listen(3000, () => { console.log('express server is running.'); });