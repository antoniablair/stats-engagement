import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import callApi from '../utils/api';
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

// todo: allow user to choose which game
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
    // todo: surface the errors
    callApi(`/api/game/${this.state.gameId}`)
      .then(res => {
        this.setState({
          numberOfRounds: res.game.numberOfRounds,
          name: res.game.name,
        });
      })
      .catch(err => console.log(err));

    callApi(`/api/game/${this.state.gameId}/questions`)
      .then(res => {
        let questions = res.questions.map((q, idx) => {
          if (idx > 0) {
            q.displayed = false;
          } else {
            q.displayed = true;
          }
          return q;
        });
        this.setState({ questions: questions })
      })
      .catch(err => console.log(err));

    callApi('/api/tokens')
      .then(res => {
        // Add token.level numbers (4/5 to start!)
        let tokens = res.tokens.map(t => { t.level = 4; return t });
        this.setState({ tokens })
      })
      .catch(err => console.log(err));

    callApi(`/api/game/${this.state.gameId}/question_tokens`)
      .then(res => {
        this.setState({ questionTokens: res.questionTokens })
      })
      .catch(err => console.log(err));
  }

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
    // todo: limit the number of questions shown to state.numberOfRounds
    const unansweredQuestions = this.state.questions.filter(q => (
      q.id !== questionId &&
      q.displayed === false
    ));

    const answeredQuestions = this.state.questions.filter(q => (
      q.id !== questionId &&
      q.displayed === true
    ));

    const answeredQuestion = this.hideAnsweredQuestion(questionId);
    let nextQuestion;

    if (unansweredQuestions.length && (answeredQuestions.length < this.state.numberOfRounds)) {
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
