import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import calculateTokenLevels from '../utils/tokens';
import colors from '../common/colors';
import Game from './Game';

const styles = StyleSheet.create({
  home: {
    textAlign: 'center',
    backgroundColor: colors.turquoise,
  }
});

/**
 * Fetches from APIs and handles all of the game logic.
 */

class GameLogicContainer extends Component {
  state = {
    questions: [],
    tokens: [],
    questionTokens: [],
    numberOfRounds: 0,
    name: '',
    gameId: 5
  };

  componentDidMount() {

    // Fetch all of the game rules
    this.callApi(`/api/game/${this.state.gameId}`)
      .then(res => {
        this.setState({
          numberOfRounds: res.game.numberOfRounds,
          name: res.game.name,
        });
      })
      .catch(err => console.log(err));

    // todo: limit the game play to numberOfRounds
    this.callApi(`/api/game/${this.state.gameId}/questions`)
      .then(res => {
        let questions = res.questions.map((q, idx) => {
          if (idx > 0) {
            q.displayed = false;
            q.answered = false;
          } else {
            q.displayed = true;
          }
          return q;
        });
        this.setState({ questions: questions })
      })
      .catch(err => console.log(err));

    this.callApi('/api/tokens')
      .then(res => {
        // Add token.level numbers (4/5 to start!)
        let tokens = res.tokens.map(t => { t.level = 4; return t });
        this.setState({ tokens}) })
      .catch(err => console.log(err));

    this.callApi(`/api/game/${this.state.gameId}/question_tokens`)
      .then(res => {
        this.setState({ questionTokens: res.questionTokens }) })
      .catch(err => console.log(err));
  }

  callApi = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  answerQuestion = (questionId, bool) => {
    let tokens = this.state.tokens;
    const affectedQuestionTokens = this.state.questionTokens.filter(qt => qt.question_id === questionId);

    const tokensToUpdate = affectedQuestionTokens.map(qt => {
      let affectedToken = tokens.filter(t => t.id === qt.token_id)[0];
      return calculateTokenLevels(affectedToken, qt, bool);
    });

    this.updateTokensState(tokensToUpdate);
    this.showNextUnansweredQuestion(questionId);
  };

  // state modifications
  updateTokensState = (tokensToUpdate) => {
    this.setState({ ...this.state.tokens, tokensToUpdate });
  };

  hideAnsweredQuestion = (questionId) => {
    let answeredQuestion = this.state.questions.filter(q => q.id === questionId)[0];
    answeredQuestion.displayed = false;
    answeredQuestion.answered = true;
    return answeredQuestion;
  };

  showNextUnansweredQuestion = (questionId) => {
    const unansweredQuestions = this.state.questions.filter(q => (
      q.id !== questionId &&
      q.answered === false &&
      q.displayed === false
    ));

    const answeredQuestion = this.hideAnsweredQuestion(questionId);
    let nextQuestion;

    if (unansweredQuestions.length) {
      // todo: pick a new one more randomly
      nextQuestion = unansweredQuestions[0];
      nextQuestion.displayed = true;
      this.setState({ ...this.state.questions, nextQuestion, answeredQuestion });
    } else {
      this.setState({ ...this.state.questions, answeredQuestion });
    }
  };

  render() {
    return (
      <div className={css(styles.home)}>
        <Game
          key={this.state.name}
          name={this.state.name}
          numberOfRounds={this.state.numberOfRounds}
          questions={this.state.questions}
          tokens={this.state.tokens}
          answerQuestion={this.answerQuestion}
          questionTokens={this.state.questionTokens} />
      </div>
    );
  }
}

export default GameLogicContainer;
