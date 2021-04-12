let USER = 'Anonymous';

const Global = {
  setUser: (user) => { USER = user },
  getUser: () => USER,
  getInitialTodoData: () => { // TODO: right located?
    return {
      id: Global.generateChildId(),
      author: Global.getUser(),
      title: '',
      content: '',
      createDate: null,
      updateDate: null,
    }
  },
  generateChildId: () => { // FIXME: this is temporary implementation
    return new Date().valueOf();
  }
}

export default Global;
