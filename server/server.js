const path = require('path');
const { nanoid } = require('nanoid');
const express = require('express');
const app = express();
const cors = require('cors');

// DB
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, 'db/db.json'));
const db = low(adapter);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../build/index.html'));
});

app.get('/static/*', (req, res) => {
  res.sendFile(path.join(__dirname, req.url));
});

app.get('/:userId/columns', (req, res) => {
  res.json(db.get('columns').filter({ userId: req.params.userId}).value());
});

// TODO: post user

app.post('/:userId/column', (req, res) => {
  req.body.id = nanoid();
  db.get('columns').push(req.body).write();
  res.json({ success: true });
})

app.get('/columns/:columnId', (req, res) => {
  //TODO
});

app.get('/columns/:columnId/todos', (req, res) => {
  res.json(db.get('todos').filter({ columnId: req.params.columnId }).value());
});

app.get('/columns/:columnId/todos/:todoId', (req, res) => {
  //TODO
});

app.post('/columns/:columnId/todo', (req, res) => {
  req.body.id = nanoid();
  db.get('todos').push(req.body).write();
  res.json({ success: true });
});

app.patch('/columns/:columnId/todos/:todoId', (req, res) => {
  db.get('todos').find({ id: req.params.todoId }).assign(req.body).write();
  res.json({ success: true });
});

app.listen(3000, () => { console.log('express server is running.'); });