import React from 'react';
import propTypes from 'prop-types';

const CORRECT_ANSWER = 'correct-answer';

class Questions extends React.Component {
  state = {
    id: 0,
    randomized: [],
    isDisabled: true,
  };

  componentDidMount() {
    this.randomQuestions();
  }

  randomQuestions = () => {
    const NUMBER = 0.5;
    const { id } = this.state;
    const { questions } = this.props;
    const answersArr = [questions[id].correct_answer, ...questions[id].incorrect_answers];
    answersArr.sort(() => Math.random() - NUMBER);
    this.setState({ randomized: answersArr });
  };

  handleCorrectAnswer = () => {
    this.setState({
      isDisabled: false,
    });
  };

  colors = (alt) => {
    const { id } = this.state;
    const { questions } = this.props;
    return (questions[id].correct_answer === alt ? 'isTrue' : 'isFalse');
  };

  render() {
    const { randomized, id, isDisabled } = this.state;
    const { questions } = this.props;
    return (
      <div>
        <div>
          <p data-testid="question-category">{questions[id].category}</p>
          <p data-testid="question-text">{questions[id].question}</p>
        </div>
        <div>
          <div data-testid="answer-options">
            {randomized.map((alt, index) => (
              <button
                onClick={ this.handleCorrectAnswer }
                data-testid={ questions[id].correct_answer === alt
                  ? CORRECT_ANSWER : `wrong-answer-${index}` }
                className={ !isDisabled && this.colors(alt) }
                type="button"
                key={ index }
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
  questions: propTypes.arrayOf(propTypes.any),
  dispatch: propTypes.func,
}.isRequired;
export default Questions;
