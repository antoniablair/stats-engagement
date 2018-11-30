import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    state = {
    response: '',
    post: '',
    responseToPost: '',
    questions: [],
    tokens: [],
    questionTokens: [],
    rounds: 0,
    gameId: 1
  };

  async componentDidMount() {
    await this.callApi(`/api/game/${this.state.gameId}`)
      .then(res => {
        this.setState({ rounds: res.games[0].numberOfRounds });
      })
      .catch(err => console.log(err));

    await this.callApi(`/api/questions`)
      .then(res => {
        this.setState({ questions: res.questions }) 
      })
      .catch(err => console.log(err));

    await this.callApi('/api/tokens')
      .then(res => {
        this.setState({ tokens: res.tokens }) })
      .catch(err => console.log(err));

    await this.callApi('/api/question_tokens')
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

//   handleSubmit = async e => {
//     e.preventDefault();
//     const response = await fetch('/api/world', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ post: this.state.post }),
//     });
//     const body = await response.text();
//     this.setState({ responseToPost: body });
//   };

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        {/* <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form> */}
        <p>{JSON.stringify(this.state)}</p>
      </div>
    );
  }
}

export default Home;
