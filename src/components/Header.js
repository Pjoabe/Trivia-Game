import md5 from 'crypto-js/md5';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      img: '',
      name: '',
    };
  }

  async componentDidMount() {
    const { email, name } = this.props;
    const convertedEmail = md5(email).toString();
    const imgApi = `https://www.gravatar.com/avatar/${convertedEmail}`;
    this.setState({
      img: imgApi,
      name,
    });
  }

  render() {
    const { img, name } = this.state;
    const { score } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ img } alt="User img" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.player.gravatarEmail,
  name: globalState.player.name,
  score: globalState.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
