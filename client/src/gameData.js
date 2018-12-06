/**
 * Calls for setting up the game
 */

// todo: surface the errors

export const getGame = async (gameId) => {
  try {
    const res = await callApi(`/api/game/${gameId}`);
    return res.game;
  }
  catch (e) {
    console.log(e);
  }
};

export const getQuestions = async (gameId) => {
  try {
    const res = await callApi(`/api/game/${gameId}/questions`);
    return res.questions.map((q, idx) => {
      if (idx > 0) {
        q.displayed = false;
      } else {
        q.displayed = true;
      }
      q.answered = false;
      return q;
    });
  } catch(e) {
    console.log(e);
  }
};

// todo: update to be specific to game
export const getTokens = async () => {
  try {
    const res = await callApi(`/api/tokens`);
    return res.tokens.map(t => { t.level = 4; return t });
  } catch(e) {
    console.log(e);
  }
};

export const getQuestionTokens = async (gameId) => {
  try {
    const res = await callApi(`/api/game/${gameId}/question_tokens`);
    return res.questionTokens;
  } catch(e) {
    console.log(e);
  }
};

const callApi = async (endpoint) => {
  const response = await fetch(endpoint);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message) 
  };
  return body;
};