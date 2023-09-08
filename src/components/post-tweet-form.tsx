import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { styled } from "styled-components"
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    color: white; 
    background-color: black;
    width: 100%;
    resize: none;
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &::placeholder{
        font-size: 16px;
        
    }
    &:focus{
        outline: none;
        border-color: #1d9bf0;
    }
`;
const AttachFileButton = styled.label`
    padding: 10px 0px;
    color: #1d9bf0;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #1d9bf0;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

`;
const AttachFileInput = styled.input`
    display: none;
`;
const SubmitBtn = styled.input`
    background-color: #1d9bf0;
    color: white;
    border: none;
    padding: 10px 0px;
    font-size: 16px;
    cursor: pointer;
    &:hover, &:active{
        opacity: 0.9;
    }
`;

export default function PostTweetForm(){
    const [isLoading, setIsLoading] = useState(false);
    const [tweet, setTweet] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTweet(e.target.value);
    };
    const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if(files && files.length === 1){
            setFile(files[0]);
        }
        // 파일이 존재하고 파일 길이가 1이면 첫번째 자식의 파일 값을 저장한다.
    };
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user= auth.currentUser;
        if(!user || isLoading || tweet === "" || tweet.length > 180 ) return;
        try{
            setIsLoading(true);
            //아래 코드는 firebase로 데이터 저장한 값 볼수 있음
            const doc = await addDoc(collection(db, 'Tweets'), {
                tweet, 
                createAt: Date.now(),
                username: user.displayName || 'Anonymous',
                // 작성자가 누군지 
                userId : user.uid,
                // 두 id가 일치하면 트윗 작성자라는 뜻! 게시물 삭제 허용!
            });
            if(file){
                const locationRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${doc.id}`)
                const result = await uploadBytes(locationRef, file);
                // 파일을 어디에 저장하고 싶은지 알려줘야함
                // 업로드 된 파일은 tweets/(유저아이디)/(문서 id)로 가도록 설정함
                const url = await getDownloadURL(result.ref);
            //이미지 url을 받아서 document에 그 url 정보를 저장
            await updateDoc(doc, {
                    photo: url,
                });
                //updateDoc함수는 업데이트 할 document에 대한 참조와 업데이트 할 데이터가 필요함
            }
            setTweet('');
            setFile(null);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        };
    };
    return(
    <Form onSubmit={onSubmit}>
        <TextArea rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?"  />
        <AttachFileButton htmlFor="file">{file ? 'Photo added✅' : 'Add photo'}</AttachFileButton>
        <AttachFileInput onChange={onFileChange} type='file' id='file' accept="image/*"   />
        {/* 타입 파일인 input이 변경될때마다 파일의 배열을 받게됨 */}
        <SubmitBtn type="submit" value={isLoading ? "Posting..." : 'Post Tweet'}  />
    </Form>)
}