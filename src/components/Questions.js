import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scoreIncrement } from '../redux/actions';

const CORRECT_ANSWER = 'correct-answer';

class Questions extends React.Component {
  state = {
    id: 0,
    randomized: [],
    isDisabled: true,
    timerInitialState: 30,
    disableAnswers: false,
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
      const { timerInitialState } = this.state;
      if (timerInitialState === 1) {
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
    const { id } = this.state;
    const { questions, dispatch, score } = this.props;
    this.setState({
      isDisabled: false,
    });
    const correct = questions[id].correct_answer;
    if (alt === correct) {
      const newScore = score + 1;
      dispatch(scoreIncrement(newScore));
    }
  };

  colors = (alt) => {
    const { id } = this.state;
    const { questions } = this.props;
    return (questions[id].correct_answer === alt ? 'isTrue' : 'isFalse');
  };

  render() {
    const { randomized, id, isDisabled, timerInitialState, disableAnswers } = this.state;
    const { questions } = this.props;
    return (
      <div>
        <h2>{timerInitialState}</h2>
        <div>
          <p data-testid="question-category">{questions[id].category}</p>
          <p data-testid="question-text">{questions[id].question}</p>
        </div>
        <div>
          <div data-testid="answer-options">
            {randomized.map((alt, index) => (
              <button
                onClick={ () => this.handleCorrectAnswer(alt) }
                data-testid={ questions[id].correct_answer === alt
                  ? CORRECT_ANSWER : `wrong-answer-${index}` }
                className={ !isDisabled && this.colors(alt) }
                type="button"
                key={ index }
                disabled={ disableAnswers }
              >
                {alt}
              </button>))}
          </div>
        </div>
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
});

export default connect(mapStateToProps)(Questions);
