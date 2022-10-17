import { PostSummaryBox} from './style'
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


