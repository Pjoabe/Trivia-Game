import React from 'react';

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

  render() {
    const { name, email } = this.state;
    return (
      <>
        <label htmlFor="name">
          Nome
          <input
            value={ name }
            id="name"
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            onChange={ this.handleInput }
            value={ email }
            id="email"
            name="email"
            type="text"
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ this.emailValidation() }
          onClick={ () => {} }
        >
          Play
        </button>
      </>
    );
  }
}

export default Login;
