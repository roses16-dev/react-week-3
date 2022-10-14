import Header from "../components/header/Header"
import PostDetail from "../components/postdetail/PostDetail"
import { useParams } from "react-router-dom"


function Detail(){

    const { id } = useParams()

    return <>
        <Header />
        {/* <PostDetail id={id}/> */}
    </>
}

export default Detail