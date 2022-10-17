import styled from "styled-components"
import NewButton from "../newbutton/NewButton"
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

        return () => dispatch(__getPost())
    }, [])

    const onClickDelete = () => {
        try{
            axios.delete(`${process.env.REACT_APP_APIADDRESS}/posts/${id}`)
        } catch (error) {
            console.log(`Detail : onClickDelete에서 오류 ${error}`)
        } finally {
            navigation('/')
        }
    }
    
    const onClickModify = () => {

        navigation(`/modify/${id}`)
    }

    console.log(temp.content)
    return <>
        <PostDetailBox>
            <div>카테고리 : {temp.category}</div>
            <div>제목 : {temp.title}</div>
            <div>글쓴이 : {temp.author}</div>
            <div>{temp.content}</div>
            <div className="btnWrap">
                <NewButton type="button" value="수정하기" onClick={onClickModify}/>
                <NewButton type="button" value="삭제하기" onClick={onClickDelete}/>
            </div>
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
        white-space:pre-line;
    }

    input{
        margin: 5px;
    }

    .btnWrap{
        width:100%;
        display:flex;
        flex-direction: row;
        justify-content: center;
    }
`
