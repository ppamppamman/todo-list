const path = require('path');
const { nanoid } = require('nanoid');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// DB
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, 'db/db.json'));
const db = low(adapter);

app.use(cors());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/login/:userId', (req, res) => {
  res.json(db.get('user').find({ id: req.params.userId }).value());
});

// TODO: post user

app.get('/:userId/columns', (req, res) => {
  res.json(db.get('columns').filter({ userId: req.params.userId}).value());
});

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

app.get('/todo/:todoId', (req, res) => {
  //TODO
});

app.post('/todo', (req, res) => {
  req.body.id = nanoid();
  db.get('todos').push(req.body).write();
  res.json({ success: true, id: req.body.id });
});

app.patch('/todo/:todoId', (req, res) => {
  db.get('todos').find({ id: req.params.todoId }).assign(req.body).write();
  res.json({ success: true });
});

app.delete('/todo/:todoId', (req, res) => {
  db.get('todos').remove({ id: req.params.todoId }).write();
  res.json({ success: true });
});

app.get('/:userId/histories', (req, res) => {
  res.json(db.get('histories').filter({ userId: req.params.userId }.value()));
});

app.post('/history', (req, res) => {
  req.body.id = nanoid();
  db.get('histories').push(req.body).write();
  res.json({ success: true });
});

app.listen(3030, () => { console.log('express server is running.'); });