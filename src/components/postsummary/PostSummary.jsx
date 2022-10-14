import styled from "styled-components"
import { useNavigate } from "react-router-dom"

function PostSummary( { post }){
    const navigator = useNavigate();

    const onClickHandler = () => {
        navigator(`/detail/${post.id}`)
    }
    
    return <>
        <PostSummaryBox onClick={onClickHandler}>
            <span className="spanTitle">{post.title}</span>
            <span className="spanAuthor">{post.author}</span>
        </PostSummaryBox>
    </>
}

export default PostSummary


const PostSummaryBox = styled.div`
    width: 100%;
    height: 30px;
    background-color: palevioletred;
    
    vertical-align: middle;
    line-height: 30px;

    display: flex;

    .spanTitle{
        width: 70%;
        margin-left: 10px;

    }

    .spanAuthor{
        width: 30%;
        margin-right: 10px;
        text-align: right;
    }
`