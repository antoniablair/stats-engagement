import React from 'react';
import { bounceIn } from 'react-animations';

import { StyleSheet, css } from 'aphrodite';
import colors from '../common/colors';


const styles = StyleSheet.create({
  card: {
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: colors.riptide,
    width: '352px',
    height: 'auto',
    minHeight: '200px',
    marginBottom: '25px',
    fontFamily: 'IBM Plex Mono', monospace,
    fontSize: '18px',
  },
  bounceIn: {
    animationName: bounceIn,
    animationDuration: '0.5s',
  },
  hide: {
    display: 'none',
  },
  text: {
    color: colors.gray20,
    padding: '15px',
    height: '135px',
  },
  action: {
    backgroundColor: colors.honeydew,
    color: colors.steelBlue,
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '25px 25px 25px 25px',
  },
  button: {
    minWidth: '50px',
    backgroundColor: colors.steelBlue,
    borderColor: colors.steelBlue,
    color: colors.honeydew,
    height: '40px',
    fontFamily: 'IBM Plex Mono', monospace,
    fontSize: '15px',
    textDecoration: 'none',
    letterSpacing: '1px',
    lineHeight: '40px',
    verticalAlign: 'middle',
    paddingRight: '10px',
    paddingLeft: '10px',
    textTransform: 'uppercase',
    display: 'block',
    borderRadius: '2px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, .3)',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: colors.steelBlue,
      borderColor: colors.steelBlue,
    }
  },
});

const Question = ({ text, id, answerQuestion, displayed }) => (
  <div className={displayed ? css(styles.card, styles.bounceIn) : css(styles.hide)}>
    <p className={css(styles.text)}>{text}</p>
    <div className={css(styles.action)}>
      <div className={css(styles.button)} onClick={() => { answerQuestion(id, true) }}>Yes</div>
      <div className={css(styles.button)} onClick={() => { answerQuestion(id, false) }}>No</div>
    </div>
  </div>
);

export default Question;