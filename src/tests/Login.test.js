import { screen } from "@testing-library/react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"


describe('<Login/>', () => {
  test('se Login eh renderizado no path correto', () => {
   const {history} = renderWithRouterAndRedux(<App/>);
   const {pathname} = history.location
   expect(pathname).toBe('/')
  })

  test('se os inputs sao renderizados na tela', () => {
    renderWithRouterAndRedux(<App/>)
    const nome = screen.getByLabelText(/nome/i)
    const email = screen.getByLabelText(/email/i)

    expect(nome).toBeInTheDocument()
    expect(email).toBeInTheDocument()
  })

  
})