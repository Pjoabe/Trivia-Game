import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
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
          onClick={ () => {
            const { history: { push } } = this.props;
            push('./');
          } }
        >
          Play Again
        </button>
        <button
          type="submit"
          data-testid="btn-ranking"
          onClick={ () => {
            const { history: { push } } = this.props;
            push('./ranking');
          } }
        >
          Ranking
        </button>
      </div>
    );
  }
}
const mapStateToProps = ({ player: { score }, player: { assertions } }) => ({
  Score: score,
  Assertions: assertions,
});

Feedback.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Feedback);
