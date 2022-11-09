import React from 'react';
import propTypes from 'prop-types';
import { getQuestions } from '../services/api';
import Questions from '../components/Questions';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.gettingQuestions();
  }

  gettingQuestions = async () => {
    const FAILED_CODE = 3;
    const returnedQuestions = await getQuestions();
    const { history } = this.props;
    if (returnedQuestions.response_code === FAILED_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        questions: returnedQuestions.results,
      });
    }
  };

  render() {
    const { questions } = this.state;
    return (
      <div>
        {questions.length > 0 && <Questions
          questions={ questions }
        />}
      </div>
    );
  }
}
Game.propTypes = {
  history: propTypes.objectOf(propTypes.any) }.isRequired;
