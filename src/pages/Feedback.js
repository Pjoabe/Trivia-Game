import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { restartRedux } from '../redux/actions';

class Feedback extends Component {
  saveUserData = () => {
    const { email, name, Assertions, history: { push }, dispatch } = this.props;
    const savedUsers = JSON.parse(localStorage.getItem('userRank'));
    const hashImg = md5(email).toString();
    const gravImg = `https://www.gravatar.com/avatar/${hashImg}`;
    const userObj = {
      name,
      assertions: Assertions,
      gravImg,
    };
    if (savedUsers) {
      const newArr = [...savedUsers, userObj];
      const sortedArr = newArr.sort((a, b) => b.assertions - a.assertions);
      localStorage.setItem('userRank', JSON.stringify(sortedArr));
      return push('./ranking');
    }
    const newSave = [userObj];
    localStorage.setItem('userRank', JSON.stringify(newSave));
    dispatch(restartRedux());
    push('./ranking');
  };

  playAgainBtn = () => {
    const { history: { push }, dispatch } = this.props;
    dispatch(restartRedux());
    push('./');
  };

  render() {
    const { Score, Assertions } = this.props;
    const minScore = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{Score}</p>
        <p data-testid="feedback-total-question">{Assertions}</p>
        {Score < minScore
          ? <p data-testid="feedback-text">Could be better...</p>
          : <p data-testid="feedback-text">Well Done!</p>}
        <button
          type="submit"
          data-testid="btn-play-again"
          onClick={ this.playAgainBtn }
        >
          Play Again
        </button>
        <button
          type="submit"
          data-testid="btn-ranking"
          onClick={ this.saveUserData }
        >
          Ranking
        </button>
      </div>
    );
  }
}
const mapStateToProps = ({ player: { score, assertions, name, gravatarEmail } }) => ({
  Score: score,
  Assertions: assertions,
  name,
  email: gravatarEmail,
});

Feedback.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Feedback);
