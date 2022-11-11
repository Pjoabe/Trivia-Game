import { getByAltText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feedback from "../pages/Feedback";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import playedStore from './helpers/mockStore';
import Ranking from '../pages/Ranking';

describe('Testa o funcionamento da página de ranking', () => {
  it('Verifica se o botão de jogar novamente funciona corretamente', () => {
    const { history } = renderWithRouterAndRedux(
      <App />, { player: playedStore }, '/ranking'
    );

    const playAgain = screen.getByRole('button', {name: /back to main screen/i});
    userEvent.click(playAgain);

    const { pathname } = history.location;

    expect(pathname).toBe('/')
  });

  it('O ranking é gerado corretamente', () => {
    renderWithRouterAndRedux(
      <App />, { player: playedStore }, '/feedback'
    );

    const rankBtn = screen.getByRole('button', { name: /ranking/i });
    userEvent.click(rankBtn);

    const srcAttribute = 'https://www.gravatar.com/avatar/671d43507820c6ed70889653d4ed8b69'
    const img = screen.getByAltText(/user/i);
    const name = screen.getByRole('heading', {level: 3, name: /igor/i});
    const assertions = screen.getByRole('heading', { level: 3, name: /100/i });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', srcAttribute);
    expect(name).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
  });
});
