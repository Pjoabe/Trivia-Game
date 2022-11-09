export async function getApi() {
  const api = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = await api.json();
  localStorage.token = result.token;
}

export async function getQuestions() {
  const token = localStorage.getItem('token');
  const api = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await api.json();
  return result;
}
