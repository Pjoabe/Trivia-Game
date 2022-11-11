const initialUserData = {
  score: 0,
  assertions: 0,
  gravatarEmail: '',
  name: '',
};

const player = (state = initialUserData, action) => {
  switch (action.type) {
  case 'CLEAR_STORE':
    return ({
      score: 0,
      assertions: 0,
      gravatarEmail: '',
      name: '',
    });
  case 'HANDLE_USER':
    return ({
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    });
  case 'INCREMENT_SCORE':
    return ({
      ...state,
      score: action.payload.score,
      assertions: action.payload.assertions,
    });
  default:
    return state;
  }
};

export default player;
