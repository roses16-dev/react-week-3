import PostWrite from "../components/postwrite/PostWrite"
import Header from "../components/header/Header"

import { useParams } from "react-router-dom"

function Write(){

    return <>
            <Header />
            <PostWrite />
            </>
}

export default Write