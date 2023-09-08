//로그인을 해야지 이 페이지가 보이고 그렇지 않은 경우에는 로그인, 회원가입 페이지로 이동함

import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

// ProtectedRoute는 다른 모든 리액트 컴포넌트와 같이 children을 가진다. 
export default function ProtectedRoute({children} : {children: React.ReactNode;})
{
    // 유저가 로그인되어 있으면 파이어베이스가 유저 정보 넘겨줌
    const user = auth.currentUser;
    console.log(user);
    if(user === null){
        return <Navigate to = '/login'  />
    }
return children
}