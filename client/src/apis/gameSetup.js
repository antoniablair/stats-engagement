export const getGame = async (gameId) => {
  return await callApi(`/api/game/${gameId}`);
};

export const getQuestions = async (gameId) => {
  return await callApi(`/api/game/${gameId}/questions`);
};

// todo: update to be specific to game
export const getTokens = async () => {
  return await callApi(`/api/tokens`);
};

export const getQuestionTokens = async (gameId) => {
  return await callApi(`/api/game/${gameId}/question_tokens`);
};

const callApi = async (endpoint) => {
  const response = await fetch(endpoint);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};