import createDataContext from './createDataContext';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
    return [
        {userInfo: action.payload},
        {sigininFlag: true}
      ];

    case 'signout':
    return [
        {userInfo: {}},
        {sigininFlag: false}
      ];
    default:
      return state;
  }
};

const signin = dispatch => {
  return user => {
    console.log('sign in');
    console.log(user);
    dispatch({ type: 'signin', payload: user });
  };
};



const signout = dispatch => {
  return () => {
    console.log('sign out');
    dispatch({ type: 'signout'});
  };
};


export const { Context, Provider } = createDataContext(
  userReducer, //Reducer
  {signin, signout}, //Functions
  [{userInfo:{}}, {sigininFlag: false}] //Initial state


// {id: "0", imgName: "img0", techniqueName: "tech0"},
// {id: "1", imgName: "img1", techniqueName: "tech1"},
// {id: "2", imgName: "img2", techniqueName: "tech2"},
// {id: "3", imgName: "img3", techniqueName: "tech3"},
// {id: "4", imgName: "img4", techniqueName: "tech4"},
// {id: "5", imgName: "img5", techniqueName: "tech5"}
);
