import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <>
        <title data-testid="ranking-title" />
        <div>
          <button
            data-testid="btn-go-home"
            type="submit"
            onClick={ () => {
              const { history: { push } } = this.props;
              push('./');
            } }
          >
            Back to main screen
          </button>
        </div>
      </>
    );
  }
}
Ranking.propTypes = {}.isRequired;

export default connect()(Ranking);
