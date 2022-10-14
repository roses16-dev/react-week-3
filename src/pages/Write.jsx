import styled from "styled-components"
import useInput from "../hooks/useInput"
import axios from "axios"


function Write(){

    const [title, onChangeTitleHandler] = useInput();
    const [content, onChangeContentHandler] = useInput();
    const [author, onChangeAuthorHandler] = useInput();
    const [password, onChangePasswordHandler] = useInput();
    

    return <>
            <PostWriteSection>
                <ul>
                    <li><div>Author</div>
                    <input type="text" value={author} onChange={onChangeAuthorHandler}></input></li>
                    <li><div>Title</div>
                    <input type="text" value={title} onChange={onChangeTitleHandler}></input></li>
                    <li><div></div>
                    <textarea value={content} onChange={onChangeContentHandler}></textarea></li>
                    <li><div>Password</div>
                    <input type="text" value={password} onChange={onChangePasswordHandler}></input></li>
                </ul>
                <input type="button" value="완료" className="btn"/>
                <input type="button" value="취소" className="btn"/>
            </PostWriteSection>
            </>
}

export default Write

const PostWriteSection = styled.div`
    width: 100%;
    margin: 0px auto;
    text-align: center;
    div{
        display: inline-block;
        width: 80px;
    }
    ul{
        list-style: none;
        margin: 0px;
        padding: 0px;
        input {
        width: 70% ;
        }
    }
    li{
        width: 100%;
        margin: 0px;
        padding: 0px;
    }

    textarea{
        width: 70%;
        min-height: 400px;
        margin: 5px 0px;
        resize: none;
    }

    .btn{
        width: 100px;
        margin: 5px;
    }
`