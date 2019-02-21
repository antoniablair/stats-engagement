import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import ProgressBar from './ProgressBar';
import Question from './Question';

const styles = StyleSheet.create({
  progressBarContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '50px 50px',
    flexWrap: 'wrap',
    maxWidth: '1000px',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  image: {
    height: '305px',
    width: '352px',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '25px',
  },
  questionContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '1000px',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  title: {
    fontSize: '19px',
    fontFamily: 'IBM Plex Mono',
    color: 'honeydew',
    marginTop: '50px',
    marginBottom: '50px',
    padding: '0 16px',
    '@media (min-width: 400px)': {
      fontSize: '36px',
    }
  },
});

class Game extends Component {
  render() {
    const questions = this.props.questions;
    const tokens = this.props.tokens;
    const answerQuestion = this.props.answerQuestion;
    return (
      <div>
        <h1 className={css(styles.title)}>{this.props.name}</h1> 
        <div className={css(styles.questionContainer)}>
          {/* Todo: Each Game should store its own image instead of hardcoding */}
          <img src={require('../images/catroom.png')} className={css(styles.image)} alt='Cat in Room' />
          {questions ? questions.map((question, idx) => <Question text={question.text}
            key={idx}
            id={question.id}
            displayed={question.displayed}
            answerQuestion={answerQuestion} />) : ''}
        </div>
        <div class={css(styles.progressBarContainer)}>
          {tokens.map(token => <ProgressBar name={token.name} level={token.level} key={token.name} />)}
        </div>
      </div>
    )
  }
};

export default Game;