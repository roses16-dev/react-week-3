import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { __getPosts } from "../redux/modules/postsSlice"

import PostSummary from "../components/postsummary/PostSummary"


function List(){

    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts)

    useEffect(() => {
        console.log('List.jsx : useEffect 호출')
        dispatch(__getPosts())
    }, [])
    
    return <>
            {posts.map((post) => <PostSummary post={post} key={post.id}/>)}
           </>
}

export default List