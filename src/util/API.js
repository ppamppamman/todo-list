import Global from '../global.js';

const API = {
  get: {
    userName: async ({ userId }) => {
      // TODO: return nickname
    },
    column: async ({ columnId }) => {
      const resourcePath = `${Global.getServerUrl()}/columns/${columnId}`;
      const res = await fetch(resourcePath);
      return res.json();
    },
    columns: async () => {
      const resourcePath = `${Global.getServerUrl()}/${Global.getUser().id}/columns`;
      const res = await fetch(resourcePath);
      return res.json();
    },
    todo: async ({ todoId }) => {
      // TODO
    },
    todos: async ({ columnId }) => {
      const resourcePath = `${Global.getServerUrl()}/columns/${columnId}/todos`;
      const res = await fetch(resourcePath);
      return res.json();
    },
    histories: async ({ userId }) => {
      const resourcePath = `${Global.getServerUrl()}/${userId}/histories`;
      const res = await fetch(resourcePath);
      return res.json();
    }
  },
  post: {
    column: async ({ columnData }) => {
      const resourcePath = `${Global.getServerUrl()}/${columnData.userId}/column`
      const res = await fetch(resourcePath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(columnData)
      });
      return res.json();
    },
    todo: async ({ todoData }) => {
      const resourcePath = `${Global.getServerUrl()}/todo`;
      const res = await fetch(resourcePath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData)
      });
      return res.json();
    },
    history: async ({ historyData }) => {
      const resourcePath = `${Global.getServerUrl()}/history`;
    }
  },
  patch: {
    column: async ({ columnId }) => {
      // TODO
    },
    todo: async ({ todoData }) => {
      const resourcePath = `${Global.getServerUrl()}/todo/${todoData.id}`;
      const res = await fetch(resourcePath, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData)
      });
      return res.json();
    },
  },
  delete: {
    column: {
      // TODO
    },
    todo: async ({ todoData }) => {
      const resourcePath = `${Global.getServerUrl()}/todo/${todoData.id}`;
      const res = await fetch(resourcePath, {
        method: 'delete'
      });
      return res.json();
    }
  }
}

window.API = API;
export default API;