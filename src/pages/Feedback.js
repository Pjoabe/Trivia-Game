import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { score } = this.props;
    const minScore = 3;

    return (
      <>
        <Header />
        <div>
          { score < minScore ? (
            <p data-testid="feedback-text">Could be better...</p>
          ) : (
            <p data-testid="feedback-text">Well Done!</p>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (globalState) => ({
  score: globalState.player.score,
});

Feedback.propTypes = {
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
