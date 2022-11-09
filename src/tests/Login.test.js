import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"


describe('<Login/>', () => {
  test('se Login eh renderizado no path correto', () => {
   const {history} = renderWithRouterAndRedux(<App/>);
   const {pathname} = history.location
   expect(pathname).toBe('/')
  })

  test('se os inputs sao renderizados na tela e o botao', () => {
    renderWithRouterAndRedux(<App/>)
    const nome = screen.getByLabelText(/nome/i)
    const email = screen.getByLabelText(/email/i)
    const btn = screen.getByRole('button')

    expect(nome).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(btn).toBeInTheDocument()
    expect(btn).toBeDisabled()
  })

  test('se o botao eh habilitado quando campos sao preenchidos', () => {
    renderWithRouterAndRedux(<App />)
    
    const nome = screen.getByLabelText(/nome/i)
    const email = screen.getByLabelText(/email/i)
    const btn = screen.getByRole('button')

    userEvent.type(nome, 'mateus')
    userEvent.type(email, 'mateus@gmail.com')
    expect(btn).toBeEnabled()
  })

  
})