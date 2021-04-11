let USER = 'Anonymous';

const Global = {
  setUser: (user) => { USER = user },
  getUser: () => USER,
  getInitialTodoData: () => { // TODO: right located?
    return {
      id: null,
      author: '',
      title: '',
      content: '',
      createDate: null,
      updateDate: null,
    }
  },
}

export default Global;
