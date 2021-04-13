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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/static/*', (req, res) => {
  res.sendFile(path.join(__dirname, req.url));
});

app.get('/column', (req, res) => {
  res.json(db.get('columns').value());
});

app.post('/column', (req, res) => {
  //TODO
});

app.get('/column/:id', (req, res) => {
  //TODO
});

app.get('/column/:columnId/todo', (req, res) => {
  res.json(db.get('todos').filter({ columnId: req.params.columnId }).value());
});

app.get('/column/:columnId/todo/:todoId', (req, res) => {
  //TODO
});

app.post('/column/:columnId/todo', (req, res) => {
  db.get('todos').push(req.body).write();
  res.json({ success: true });
});

app.put('/column/:columnId/todo/:todoId', (req, res) => {
  db.get('todos').find({ id: req.params.id }).assign(req.body).write();
  res.json({ success: true });
});

app.listen(3000, () => { console.log('express server is running.'); });