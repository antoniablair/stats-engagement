import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  helpBox: {
    textAlign: 'center',
    fontSize: '28px',
    margin: '50px',
  }
});

const Help = () => (
  <div className={css(styles.helpBox)}>
    <p><a href="/">Answer the questions</a> and see how they affect your attributes!</p>
    <p>This project was generated with create-react-app, Forest lumber admin panels, and Aphrodite for styles.</p>
    <p>Log in to the admin <a href='https://app.forestadmin.com/34534/dashboard/50572'
      target='_blank'
      rel='noopener noreferrer'>here</a>.</p>
  </div>
);

export default Help;