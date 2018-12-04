import React from 'react';

import { StyleSheet, css } from 'aphrodite';

import colors from '../common/colors';

const styles = StyleSheet.create({
  progressBar: {
    position: 'relative',
    height: '20px',
    width: '350px',
    borderRadius: '50px',
    border: '1px solid #fff',
    backgroundColor: '#fff',
  },

  filler: {
    background: colors.blueGrey,
    height: '100%',
    borderRadius: 'inherit',
    transition: 'width .2s ease-in',
  }
});

const Filler = ({ percentage }) => {
  return <div className={css(styles.filler)} style={{width: `${percentage}%`}} />
};

const ProgressBar = ({ name, level }) => {
  const percentage = ((level / 5) * 100);
  return (
  <div>
    <p>{name}</p>
    <div className={css(styles.progressBar)}>
      <Filler percentage={percentage} />
    </div>
  </div>)
};

export default ProgressBar;