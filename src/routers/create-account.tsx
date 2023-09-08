import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, Error, Input, Switcher, Title, Wrapper } from "../components/auth-component";
import GithubButton from "../components/github-btn";




export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]= useState('');
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{  
        const {
            target : {name, value},
        } = e;
        if(name === 'name'){
            setName(value);
        }else if (name === 'email'){
            setEmail(value);
        }else if (name === 'password'){
            setPassword(value);
        }
    }; 

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('')
        if(isLoading || name === "" || email === "" || password === "")return; 
        try{ 
        setIsLoading(true);
        //create an account 생성
        //set the name of the user.profile 지정
        // redirect to the home page 
        
        //유저를 만들고
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        console.log(credentials.user);
        //유저의 정보 업데이트하고
        await updateProfile(credentials.user, {
            displayName: name,
        });
        //완성되면 홈화면으로 이동
        navigate('/');
        }catch(e) {
            if(e instanceof FirebaseError){
                setError(e.message)
            }
            

        }finally{
            setIsLoading(false);
        }
        
        console.log(name, email, password);
    };
    
    return (
        <Wrapper>
            <Title> Join 𝕏 </Title>
          <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required />
            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
            <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required />
            <Input type="submit" value={isLoading ? 'Loading...' : "Create Account"} />
          </Form>
          {error !== "" ? <Error>{error}</Error> : null }
          <Switcher>
            Already have an account? 
            <Link to='/login'> LOGIN &rarr;</Link>
          </Switcher>
          <GithubButton />
        </Wrapper>
      );
      
}