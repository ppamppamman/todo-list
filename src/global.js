let USER = 'Anonymous';

const Global = {
  setUser: (user) => { USER = user },
  getUser: () => USER,
}

export default Global;
