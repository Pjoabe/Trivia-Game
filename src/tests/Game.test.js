import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import { act } from "react-dom/test-utils";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"

describe('<Game/>', () => {
  
  afterEach(() => jest.clearAllMocks());
  
  test('se volta para pagina inicial com token invalido', async() => {
    
    const token = 'tokeninvalido'

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(token),
  });

  const {history} = renderWithRouterAndRedux(<App/>)
    
    const nome = screen.getByLabelText(/nome/i)
    const email = screen.getByLabelText(/email/i)
    userEvent.type(nome, 'mateus')
    userEvent.type(email, 'mateus@gmail.com')
    const btn = screen.getByRole('button', {name: 'Play'})

    userEvent.click(btn)
    await waitFor(() => {
      const url = history.location.pathname
      expect(url).toBe('/')
    })


  })

  // test('se o botao play redirenciona para o path /game', async() => {
  //   const {history} = renderWithRouterAndRedux(<App/>)
    
  //   const nome = screen.getByLabelText(/nome/i)
  //   const email = screen.getByLabelText(/email/i)
  //   userEvent.type(nome, 'mateus')
  //   userEvent.type(email, 'mateus@gmail.com')
  //   const btn = screen.getByRole('button', {name: 'Play'})

  //   userEvent.click(btn)

  //   // act(() => {
  //   //   history.push('/game')

  //   // })
  //   await waitFor(() => {
  //     const url = history.location.pathname
  //     expect(url).toBe('/game')
  //   })

    
  // })

 

})