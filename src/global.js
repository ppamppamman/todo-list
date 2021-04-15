let USER = { id: 'ne123', name: 'Neis' };
let SERVER_URL = 'http://localhost:3030';

const Global = {
  setUser: (user) => { USER = user },
  getUser: () => USER,
  setServerUrl: (serverUrl) => { SERVER_URL = serverUrl },
  getServerUrl: () => SERVER_URL,
  getInitialTodoData: () => { // TODO: right located?
    return {
      id: Global.generateChildId(),
      author: Global.getUser(),
      title: '',
      content: '',
      createTime: null,
      updateTime: null,
    }
  },
  generateChildId: () => { // FIXME: this is temporary implementation
    return new Date().valueOf();
  }
}

export default Global;
