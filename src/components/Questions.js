import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { scoreIncrement } from '../redux/actions';
import clock from '../clock.gif';

const CORRECT_ANSWER = 'correct-answer';

class Questions extends React.Component {
  state = {
    id: 0,
    randomized: [],
    isDisabled: true,
    timerInitialState: 30,
    disableAnswers: false,
    stopTimer: false,
  };

  componentDidMount() {
    this.randomQuestions();
    this.startTimer();
  }

  startTimer = () => {
    const oneSecond = 1000;
    const timer = setInterval(() => {
      this.setState((prevState) => ({
        ...prevState,
        timerInitialState: prevState.timerInitialState - 1,
      }));
      const { timerInitialState, stopTimer } = this.state;
      if (timerInitialState === 1 || stopTimer) {
        clearInterval(timer);
        this.setState({
          disableAnswers: true,
          isDisabled: false,
        });
      }
    }, oneSecond);
  };

  randomQuestions = () => {
    const NUMBER = 0.5;
    const { id } = this.state;
    const { questions } = this.props;
    const answersArr = [questions[id].correct_answer, ...questions[id].incorrect_answers];
    answersArr.sort(() => Math.random() - NUMBER);
    this.setState({ randomized: answersArr });
  };

  handleCorrectAnswer = (alt) => {
    const three = 3;
    const ten = 10;
    const { id, timerInitialState } = this.state;
    const { questions, dispatch, score, assertions } = this.props;
    let difficultyVal = 0;
    this.setState({
      isDisabled: false,
      disableAnswers: true,
      stopTimer: true,
    });
    const correct = questions[id].correct_answer;
    if (alt === correct) {
      if (questions[id].difficulty === 'easy') difficultyVal = 1;
      if (questions[id].difficulty === 'medium') difficultyVal = 2;
      if (questions[id].difficulty === 'hard') difficultyVal = three;
      const assertIncrement = ten + (timerInitialState * difficultyVal);
      const newAssertion = assertions + assertIncrement;
      const newScore = score + 1;
      dispatch(scoreIncrement(newScore, newAssertion));
    }
  };

  colors = (alt) => {
    const { id } = this.state;
    const { questions } = this.props;
    return (questions[id].correct_answer === alt ? 'isTrue' : 'isFalse');
  };

  increaseId = () => {
    const FOUR = 4;
    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
    }), ({ id } = this.state) => id <= FOUR && this
      .randomQuestions(), () => console.log('teste'));
    this.teste();
  };

  teste = () => {
    this.startTimer();
    this.setState({
      isDisabled: true,
      timerInitialState: 30,
      disableAnswers: false,
      stopTimer: false,
    });
  };

  render() {
    const { randomized, id, isDisabled, timerInitialState, disableAnswers } = this.state;
    const { questions } = this.props;
    const FOUR = 4;
    const ten = 10;
    return (
      <div>
        {id <= FOUR ? (
          <div className="gameDiv">
            <div className="questionDiv">
              <div className="catDiv">
                <p data-testid="question-category">{questions[id].category}</p>
              </div>
              <div className="questionTextDiv">
                <p data-testid="question-text">{questions[id].question}</p>
              </div>
              <div className="cronometerDiv">
                <img src={ clock } alt="cronometer" />
                <h2 className={ timerInitialState < ten ? 'red' : undefined }>
                  {timerInitialState}
                </h2>
              </div>
            </div>
            <div className="answerDiv">
              <div className="options" data-testid="answer-options">
                {randomized.map((alt, index) => (
                  <button
                    onClick={ () => this.handleCorrectAnswer(alt) }
                    data-testid={ questions[id].correct_answer === alt
                      ? CORRECT_ANSWER : `wrong-answer-${index}` }
                    className={ `${!isDisabled && this.colors(alt)} optBtn` }
                    type="button"
                    key={ index }
                    disabled={ disableAnswers }
                  >
                    {alt}
                  </button>))}
              </div>
              { !isDisabled && (
                <button
                  type="button"
                  className="nextBtn"
                  data-testid="btn-next"
                  onClick={ this.increaseId }
                >
                  Next
                </button>
              )}
            </div>
          </div>) : (<Redirect to="/feedback" />) }
      </div>

    );
  }
}

Questions.propTypes = {
  score: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (globalState) => ({
  score: globalState.player.score,
  assertions: globalState.player.assertions,
});

export default connect(mapStateToProps)(Questions);
