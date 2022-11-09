const initialUserData = {
  email: '',
  name: '',
};

const userInfo = (state = initialUserData, action) => {
  switch (action.type) {
  case 'HANDLE_USER':
    return ({
      ...state,
      email: action.payload.email,
      name: action.payload.name,
    });
  default:
    return state;
  }
};

export default userInfo;
