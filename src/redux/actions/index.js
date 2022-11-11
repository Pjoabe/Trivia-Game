export const saveUserData = (name, email) => ({
  type: 'HANDLE_USER',
  payload: {
    name,
    email,
  },
});

export const scoreIncrement = (score, assertions) => ({
  type: 'INCREMENT_SCORE',
  payload: {
    score,
    assertions,
  },
});
