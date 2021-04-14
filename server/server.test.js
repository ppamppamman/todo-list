// import API from '../src/util/API.js';
// import Global from '../src/global.js';
const TEST_SERVER_URL = 'http://localhost:3000';
const TEST_USER_ID = 'abc123';
const TEST_USER_NAME = 'Anynymous';

const API = {
  getLogin: async ({ userId }) => {
    // TODO: return nickname
  },
  getColumn: async ({ columnId }) => {
    const resourcePath = `${TEST_SERVER_URL}/columns/${columnId}`;
    const res = await fetch(resourcePath);
    return res.json();
  },
  getColumns: async () => {
    const resourcePath = `${TEST_SERVER_URL}/${TEST_USER_ID}/columns`;
    const res = await fetch(resourcePath);
    return res.json();
  },
  getTodo: async ({ todoId }) => { /* TODO */ },
  getTodos: async ({ columnId }) => {
    const resourcePath = `${TEST_SERVER_URL}/columns/${columnId}/todos`;
    const res = await fetch(resourcePath);
    return res.json();
  },
  postColumn: async ({ columnData }) => {
    const resourcePath = `${TEST_SERVER_URL}/${columnData.userId}/column`
    const res = await fetch(resourcePath, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(columnData)
    });
    return res.json();
  },
  postTodo: async ({ todoData }) => {
    const resourcePath = `${TEST_SERVER_URL}/columns/${todoDate.columnId}/todo`;
    const res = await fetch(resourcePath, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData)
    });
    return res.json();
  },
  patchColumn: async ({ columnId }) => { /* TODO */ },
  patchTodo: async ({ columnId }) => {

  },
  deleteColumn: {

  },
  deleteTodo: {

  }
}

/* =================================================================== */

const fetch = require('node-fetch');

/*
Assuming initial 'db.json' is the following.
{
  "user": [
    {
      "id": "abc123",
      "name": "Anonymous"
    }
  ],
  "columns": [],
  "todos": []
}

Copy this(in 'db/test.json') to 'db/db.json', enter 'yarn run-server' and 'yarn test-server'.
*/

let NUMBER = 0;
const nextNumber = () => NUMBER++;
const generateTestColumnData = () => {
  return {
    userId: TEST_USER_ID,
    title: `COLUMN TITLE FOR TEST ${nextNumber()}`,
  };
};
const generateTestTodoData = () => {
  return {
    author: TEST_USER_NAME,
    title: `TODO TITLE FOR TEST ${nextNumber()}`,
    content: `TODO CONTENT FOR TEST ${nextNumber()}`,
  };
};


const testPostColumn = (columnData) => {
  console.log('run testPostColumn()');
  API.getColumns().then(console.log);
  API.postColumn({ columnData: generateTestColumnData() }).then(console.log);
  API.getColumns().then(console.log);
}

testPostColumn();