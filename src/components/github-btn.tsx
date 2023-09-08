import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { styled } from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    margin-top: 30px;
    background-color: white;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    color: black;
    cursor: pointer;

`
const Logo =  styled.img`
    height: 25px;
`

export default function GithubButton() {
    const navigate = useNavigate();
    const onClick = async() => {
        try{
            const provider= new GithubAuthProvider();
            // 페이지로 이동해서 깃허브계정연동시켜주는거
            // await signInWithRedirect(auth, provider);
            // 팝업을 통해서 깃허브 계정 연결
            await signInWithPopup(auth, provider);
            navigate('/');
        }catch(error){
            console.error(error)
        }
       
     };
    return <Button onClick={onClick}>
        <Logo src='/github-logo.svg'    />
        Continue with Github
    </Button>
}