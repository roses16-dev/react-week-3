import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { __getPost } from "../../redux/modules/postsSlice"
import axios from "axios"

function PostDetail( { id } ){

    const navigation = useNavigate();
    const dispatch = useDispatch();

    const temp = useSelector(state => state.posts.post);

    useEffect( () => {
        dispatch(__getPost(id))
    }, [])

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
            <div>{temp.category}</div>
            <div>{temp.title}</div>
            <div>{temp.author}</div>
            <div>{temp.content}</div>
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