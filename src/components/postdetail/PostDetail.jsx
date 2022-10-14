import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"

import axios from "axios"

function PostDetail( { id } ){

    const navigation = useNavigate();
    
    const [post, setPost] = useState();

    useEffect( () => {
        async function getData(){
            const post = await axios.get(`http://localhost:3001/posts/${id}`)
            setPost(post)
        }
    })

    console.log(post)
    const onClickDelete = () => {
        try{
            axios.delete(`http://localhost:3001/posts/${id}`)
        } catch (error) {
            console.log(`Detail : onClickDelete에서 오류 ${error}`)
        } finally {
            navigation('/')
        }
    }

    return <>
        <PostDetailBox>
            {/* <div>{post.category}</div>
            <div>{post.title}</div>
            <div>{post.author}</div>
            <div>{post.content}</div> */}
            <input type="button" value="수정하기" />
            <input type="button" value="삭제하기" onClick={onClickDelete}/>
        </PostDetailBox>
    </>
}

export default PostDetail


const PostDetailBox = styled.div`
    width: 100%;
    height: 100%;
    
    div{
        min-height: 50px;
        margin: 5px;
    }

    input{
        margin: 5px;
    }`