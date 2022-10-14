import PostWrite from "../components/postwrite/PostWrite"
import Header from "../components/header/Header"

import { useParams } from "react-router-dom"

function Write(){
    const { id } = useParams()

    if(id) {
        return  <>
                    <Header />
                    <PostWrite id = {id}/>
                </>
    }
    else {
        return <>
                    <Header />
                    <PostWrite />
                </>
    }

}

export default Write