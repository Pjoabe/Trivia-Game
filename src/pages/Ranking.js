import React, { Component } from 'react';
import { connect } from 'react-redux';
import logoTrivia from '../logoTrivia.png';
import star from '../star.png';

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
      <div className="rankMainDiv">
        <div className="imgRankDiv">
          <img src={ logoTrivia } alt="logo" className="rankLogo" />
        </div>
        <h2 className="rankTitle" data-testid="ranking-title">Ranking</h2>
        <div className="rankDiv">
          <ol>
            { playersScore.map((obj, index) => (
              <li key={ index } className="rankUser">
                <div className="personalUserDiv">
                  <img src={ obj.gravImg } alt="user" className="userRankImg" />
                  <h3 className="userNameRank" data-testid={ `player-name-${index}` }>
                    { obj.name }
                  </h3>
                </div>
                <div className="pointsDiv">
                  <img src={ star } alt="star" className="star" />
                  <h3
                    className="userNamePoints"
                    data-testid={ `player-score-${index}` }
                  >
                    { obj.assertions }
                  </h3>
                  <h3 className="pointsWord">pontos</h3>
                </div>
              </li>
            )) }
          </ol>
        </div>
        <div className="rankBtnDiv">
          <button
            data-testid="btn-go-home"
            type="submit"
            className="btnBack"
            onClick={ this.playAgain }
          >
            Back to main screen
          </button>
        </div>
      </div>
    );
  }
}
Ranking.propTypes = {}.isRequired;

export default connect()(Ranking);
