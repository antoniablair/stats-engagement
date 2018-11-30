import React, { Component } from 'react';

// import { StyleSheet, css } from 'aphrodite';

// const styles = StyleSheet.create({
//   emoji: {
//     marginLeft: '10px',
//     marginRight: '10px',
//   }
// });

class Admin extends Component {
  state = {
    questions: '',
    petNames: [],
  };

  getPets = async () => {
    const response = await fetch('/api/pets');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  componentDidMount() {
    this.getPets()
      .then(res => this.setState({ petNames: res.pets }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
          <h1>Admin</h1>
          <ol>
              <li>Add/remove/update tokens</li>
              <li>Add/remove/update questions</li>
              <li>Set the number of questions or rounds per game</li>
          </ol>
          <h2>Questions</h2>
          { this.state.questions }
          <p>{JSON.stringify(this.state)}</p>
      </div>
    )
  }
};

export default Admin;