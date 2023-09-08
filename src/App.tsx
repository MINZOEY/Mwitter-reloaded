import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routers/home"
import Profile from "./routers/profile"
import Login from "./routers/login"
import CreateAccount from "./routers/create-account"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const router =  createBrowserRouter([
  {
    path: "/",
    element: <Layout  />,
    children: [
      {
        path: "",
        element: <Home  />,
      },
      {
        path: 'profile',
        element: <Profile />,
      }
    ]
  },

  // layout으로 감싸는 과정은 로그인과 계정생성에는 제외하고 싶어서 따로 분리함 
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/create-account',
    element: <CreateAccount />
  }
])

const GlobalStyles = createGlobalStyle`
${reset}
*{
  box-sizing : border-box;
}
body{
  background-color: black;
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
` ;




function App() {

  return (
    <>
    <GlobalStyles />
     <RouterProvider router={router} />
    </>
  )
}

export default App
