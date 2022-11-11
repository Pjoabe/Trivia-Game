import { screen, waitFor } from "@testing-library/react";
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
    const btn = screen.getByRole('button', {name: 'Play'})

    expect(nome).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(btn).toBeInTheDocument()
    expect(btn).toBeDisabled()
  })

  test('se o botao eh habilitado quando campos sao preenchidos', () => {
    renderWithRouterAndRedux(<App />)
    
    const nome = screen.getByLabelText(/nome/i)
    const email = screen.getByLabelText(/email/i)
    const btn = screen.getByRole('button', {name: 'Play'})

    userEvent.type(nome, 'mateus')
    userEvent.type(email, 'mateus@gmail.com')
    expect(btn).toBeEnabled()
  })

  test('se o botao configuracoes redirenciona para o path /settings', () => {
    const {history} = renderWithRouterAndRedux(<App/>)
    const settingsBtn = screen.getByRole('button', {name: 'Configurações'})
    expect(settingsBtn).toBeInTheDocument()
    userEvent.click(settingsBtn)
    const {pathname} = history.location
    expect(pathname).toBe('/settings')

  })

  jest.setTimeout(3500);
  test('se o botao play redirenciona para o path /game', async() => {
    const {history} = renderWithRouterAndRedux(<App/>)
    
    const nome = screen.getByLabelText(/nome/i)
    const email = screen.getByLabelText(/email/i)
    userEvent.type(nome, 'mateus')
    userEvent.type(email, 'mateus@gmail.com')
    const btn = screen.getByRole('button', {name: 'Play'})

    userEvent.click(btn)
    await waitFor(() => {
      const url = history.location.pathname
      expect(url).toBe('/game')
    })

    
  })

  
})