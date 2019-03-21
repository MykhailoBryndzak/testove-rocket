const authLocStorage = JSON.parse(localStorage.getItem('auth'));

const isLogin = (authData) => {
  if(authData && authData.token) {
    return true;
  }
};

const initialState = {
  userData: {...authLocStorage, isLogin: isLogin(authLocStorage)} || {
    userId: '',
    token: '',
    tokenExpiration: '',
    isLogin: !!this.token
  }
};

const auth = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'LOGIN':
      const {userId, token, tokenExpiration, firstName, lastName} = action.data;
      localStorage.setItem('auth', JSON.stringify(action.data));
      return {
        ...state,
        userData: {
          isLogin: isLogin(action.data),
          userId,
          token,
          tokenExpiration,
          firstName,
          lastName
        }
      };
    case 'LOGOUT':
      localStorage.removeItem('auth');
      return {
        ...state,
        userData: {}
      };
    default:
      return state;
  }
};

export default auth;
