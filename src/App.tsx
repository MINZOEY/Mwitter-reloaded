import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routers/home"
import Profile from "./routers/profile"
import Login from "./routers/login"
import CreateAccount from "./routers/create-account"
import { createGlobalStyle, styled } from "styled-components"
import reset from "styled-reset"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./firebase"
import ProtectedRoute from "./components/protected-route"

const router =  createBrowserRouter([
  {
    path: "/",
    element: 
    // layout으로 홈과 프로필이 감싸진 형태라  
    // home 페이지는 protectedroute의 children으로 들어가게 됨. profile도 마찬가지 
      <ProtectedRoute>
        <Layout  />
      </ProtectedRoute>,
    children: [
      {
        path: "",
        element: 
            <Home /> 
            
        ,
      },
      {
        path: 'profile',
        element:  
            <Profile />
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

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async() => {
    // wait for firebase / 로그인되어 있으면 파이어베이스가 우리가 누군지, 어떤 사용자인지 알 수 있다
    // 인증상태가 준비되었는지를 기다림
    // authStateReady이게 무엇이냐면 최초인증상태가 완료될때 실행되는 promise를 return함(파이어베이스가 쿠키와 토큰을 읽고  백과의 소통해서 로그인 여부를 확인하는동안 기다리겟다 이거쥐~)
    await auth.authStateReady();
  //  setTimeout(() => setIsLoading(false), 2000)
    setIsLoading(false)
    };

    useEffect(() => {
      init();
    }, [])


  return (
    <Wrapper>
    <GlobalStyles />
    {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}

    </Wrapper>
  )
}

export default App
