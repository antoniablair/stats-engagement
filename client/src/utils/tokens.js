const calculateTokenLevels = (affectedToken, questionToken, bool) => {
  let token = affectedToken;

  if (bool === true) {
    token.level += parseInt(questionToken.points_if_true);
  } else if (bool === false) {
    token.level += parseInt(questionToken.points_if_false);
  }

  if (token.level > 5) {
    token.level = 5;
  }

  if (token.level < 0) {
    token.level = 0;
  }

  return token;
};

export default calculateTokenLevels;