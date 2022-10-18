import PostWrite from "../components/postwrite/PostWrite"
import Header from "../components/header/Header"

import { useParams } from "react-router-dom"

function Modify(){
    const { id } = useParams()

    return  <>
            <Header />
            <PostWrite id = {id}/>
        </>

}

export default Modify