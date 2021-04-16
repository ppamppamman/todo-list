let USER;
let SERVER_URL = 'http://localhost:3030';

const Global = {
  setUser: (user) => { USER = user },
  getUser: () => USER,
  setServerUrl: (serverUrl) => { SERVER_URL = serverUrl },
  getServerUrl: () => SERVER_URL,
  getInitialTodoData: ({ columnId }) => { // TODO: right located?
    return {
      id: Global.generateChildId(),
      columnId,
      author: Global.getUser().name,
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
