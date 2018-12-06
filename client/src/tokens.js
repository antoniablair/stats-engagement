const calculateTokenLevels = (affectedToken, questionToken, bool) => {
  let token = affectedToken;

  if (bool === true) {
    token.level += parseInt(questionToken.points_if_true);
  } else if (bool === false) {
    token.level += parseInt(questionToken.points_if_false);
  }

  token.level = token.level > 5 ? 5 : token.level;
  token.level = token.level < 0 ? 0 : token.level;

  return token;
};

export default calculateTokenLevels;
