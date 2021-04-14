import Global from '../global.js';

const API = {
  getLogin: async ({ userId }) => {
    // TODO: return nickname
  },
  getColumn: async ({ columnId }) => {
    const resourcePath = `${Global.getServerUrl()}/columns/${columnId}`;
    const res = await fetch(resourcePath);
    return res.json();
  },
  getColumns: async () => {
    const resourcePath = `${Global.getServerUrl()}/${Global.getUser().id}/columns`;
    const res = await fetch(resourcePath);
    return res.json();
  },
  getTodo: async ({ todoId }) => { /* TODO */ },
  getTodos: async ({ columnId }) => {
    const resourcePath = `${Global.getServerUrl()}/columns/${columnId}/todos`;
    const res = await fetch(resourcePath);
    return res.json();
  },
  postColumn: async ({ columnData }) => {
    const resourcePath = `${Global.getServerUrl()}/${columnData.userId}/column`
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
    const resourcePath = `${Global.getServerUrl()}/columns/${todoDate.columnId}/todo`;
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

export default API;