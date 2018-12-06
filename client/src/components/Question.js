import React from 'react';
import { bounceIn } from 'react-animations';

import { StyleSheet, css } from 'aphrodite';
import colors from '../common/colors';


const styles = StyleSheet.create({
  card: {
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: colors.white,
    width: '352px',
    height: 'auto',
    minHeight: '200px',
    marginBottom: '25px',
    fontSize: '25px',
  },
  bounceIn: {
    animationName: bounceIn,
    animationDuration: '0.5s',
  },
  hide: {
    display: 'none',
  },
  text: {
    color: colors.grey,
    padding: '15px',
    height: '135px',
  },
  action: {
    backgroundColor: colors.white,
    color: colors.purple,
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '25px 25px 25px 25px',
  },
  button: {
    minWidth: '50px',
    backgroundColor: colors.blueGrey,
    borderColor: colors.blueGrey,
    color: colors.white,
    height: '40px',
    fontSize: '12px',
    textDecoration: 'none',
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
      backgroundColor: colors.blueGrey,
      borderColor: colors.blueGrey,
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