import React from 'react';
import { connect } from 'react-redux';
import { getApi } from '../services/api';
import { saveUserData } from '../redux/actions/index';
import logoTrivia from '../logoTrivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  emailValidation = () => {
    const { email, name } = this.state;
    const check = /\S+@\S+\.\S+/;
    return !(check.test(email) && name.length !== 0);
  };

  fetchToken = async () => {
    const { name, email } = this.state;
    const { history, dispatch } = this.props;
    await getApi();
    dispatch(saveUserData(name, email));
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    const { history: { push } } = this.props;
    return (
      <>
        <div className="logoLogin">
          <img src={ logoTrivia } alt="logo" />
        </div>
        <div className="loginDiv">
          <input
            value={ name }
            placeholder="Nome"
            className="name"
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleInput }
          />
          <input
            onChange={ this.handleInput }
            placeholder="E-mail do gravatar"
            value={ email }
            className="email"
            name="email"
            type="text"
            data-testid="input-gravatar-email"
          />
          <button
            className="configBtn"
            data-testid="btn-settings"
            type="button"
            onClick={ () => {
              push('/settings');
            } }
          >
            Configurações
          </button>
          <button
            data-testid="btn-play"
            className="playBtn"
            type="button"
            disabled={ this.emailValidation() }
            onClick={ this.fetchToken }
          >
            Play
          </button>
        </div>
      </>
    );
  }
}
Login.propTypes = {}.isRequired;

export default connect()(Login);
