import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feedback from "../pages/Feedback";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import playedStore from './helpers/mockStore';
import { act } from "react-dom/test-utils";

describe('<feedback>',()=> {

  
it('aparece messagem Well Done! se score for maior que 3',()=> {
  const {history} = renderWithRouterAndRedux(<App/>, {player: {score: 4, assertions: 80, gravatarEmail: 'matues@gmail.com', name: 'batman'}}, '/feedback')
  const {pathname} = history.location
  expect(pathname).toBe('/feedback')
  const message = screen.getByText('Well Done!')
  expect(message).toBeInTheDocument()

});
it('aparece messagem Could be better... se score for maior que ',() => {
  renderWithRouterAndRedux(<App/>, {player: {score: 2, assertions: 80, gravatarEmail: 'matues@gmail.com', name: 'batman'}}, '/feedback')
  const message = screen.getByText('Could be better...')
  expect(message).toBeInTheDocument()
});
it('se o botao play again volta para pagina inicial',() => {
  const {history} = renderWithRouterAndRedux(<App/>, {player: {score: 2, assertions: 80, gravatarEmail: 'matues@gmail.com', name: 'batman'}}, '/feedback')
  const btn = screen.getByRole('button', {name: 'Play Again'})
  expect(btn).toBeInTheDocument()
  userEvent.click(btn)
  const {pathname} = history.location
  expect(pathname).toBe('/')
  
});
it('se o botao ranking vai para pagina de ranking',() => {
  const {history} = renderWithRouterAndRedux(<App/>, {player: {score: 2, assertions: 80, gravatarEmail: 'matues@gmail.com', name: 'batman'}}, '/feedback')
  const btn = screen.getByRole('button', {name: 'Ranking'})
  expect(btn).toBeInTheDocument()
  userEvent.click(btn)
  const {pathname} = history.location
  expect(pathname).toBe('/ranking')
});
it('O botão do ranking funciona mesmo com mais de um jogador', () => {
  const { history } = renderWithRouterAndRedux(
    <App />, { player: playedStore }, '/feedback'
  );

  const rankBtn = screen.getByRole('button', { name: /ranking/i })
  userEvent.click(rankBtn);

  const play = screen.getByRole('button', { name: /back to main screen/i })
  userEvent.click(play);

  act(() => {
    history.push('/feedback');
  })
  const rankkBtn = screen.getByRole('button', { name: /ranking/i })
  userEvent.click(rankkBtn);
  expect(history.location.pathname).toBe('/ranking')
});

})