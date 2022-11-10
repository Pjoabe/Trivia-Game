import React from 'react';
import propTypes from 'prop-types';

class Questions extends React.Component {
  state = {
    id: 0,
    randomized: [],
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

  render() {
    const { randomized, id } = this.state;
    const { questions } = this.props;
    const CORRECT_ANSWER = 'correct-answer';
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
                data-testid={ questions[id].correct_answer === alt
                  ? CORRECT_ANSWER : `wrong-answer-${index}` }
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
