import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      playersScore: [],
    };
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('userRank'));
    if (userData) {
      this.setState({
        playersScore: userData,
      });
    }
  }

  playAgain = () => {
    const { history: { push } } = this.props;
    push('./');
  };

  render() {
    const { playersScore } = this.state;
    return (
      <>
        <title data-testid="ranking-title" />
        <div>
          <button
            data-testid="btn-go-home"
            type="submit"
            onClick={ this.playAgain }
          >
            Back to main screen
          </button>
        </div>
        <div>
          <ol>
            { playersScore.map((obj, index) => (
              <li key={ index }>
                <img src={ obj.gravImg } alt="user" />
                <h3 data-testid={ `player-name-${index}` }>{ obj.name }</h3>
                <h3 data-testid={ `player-score-${index}` }>{ obj.assertions }</h3>
              </li>
            )) }
          </ol>
        </div>
      </>
    );
  }
}
Ranking.propTypes = {}.isRequired;

export default connect()(Ranking);
