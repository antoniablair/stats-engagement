import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import colors from '../common/colors';

const styles = StyleSheet.create({
  progressBar: {
    position: 'relative',
    height: '20px',
    width: '350px',
    borderRadius: '50px',
    border: '1px solid #f0fff0',
    backgroundColor: colors.honeydew,
  },

  filler: {
    background: colors.steelBlue,
    height: '100%',
    borderRadius: 'inherit',
    transition: 'width .2s ease-in',
  },

  vitalsCategory: {
    color: colors.honeydew,
    fontFamily: 'IBM Plex Mono', monospace,
    fontSize: '15px',
    letterSpacing: '4px',
    textTransform: 'uppercase',
  }

});

const Filler = ({ percentage }) => {
  return <div className={css(styles.filler)} style={{ width: `${percentage}%` }} />
};

const ProgressBar = ({ name, level }) => {
  // todo: make backend support more than 0-5
  const percentage = ((level / 5) * 100);
  return (
    <div>
      <p className={css(styles.vitalsCategory)}>{name}</p>
      <div className={css(styles.progressBar)}>
        <Filler percentage={percentage} />
      </div>
    </div>)
};

export default ProgressBar;