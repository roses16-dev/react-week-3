import { PostWriteSection } from './style'
import NewButton from '../newbutton/NewButton'
import { useNavigate } from "react-router-dom"
import { __writePost, __getPost } from '../../redux/modules/postsSlice'
import axios from 'axios'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect, useRef } from 'react'

function PostWrite({ id=false }){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const temp = {
        author: useRef(),
        category: useRef(),
        title: useRef(),
        content: useRef(),
        password: useRef()
    }

    useEffect(() => {
        if(id) dispatch(__getPost(id))
    }, [])

    const post = useSelector(state => state.posts.post)
    console.log(post)
    

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        if(!/^.{2,10}$/.test(temp.author.current.value)) {
            alert('⛔이름은 2-10자로 적어주세요');
            return
        } 

        if(!/^.{2,20}$/.test(temp.title.current.value)) {
            alert('⛔제목은 2-20자로 적어주세요');
            return
        } 

        if(!/^.{10,}$/gs.test(temp.content.current.value)) {
            alert('⛔내용은 10자 이상 적어주세요');
            return
        } 

        if(!/^\d{4,10}$/.test(temp.password.current.value)) {
            alert('⛔비밀번호는 4-10자 이내 숫자로 적어주세요');
            return
        } 
        
        if(!id) {
            dispatch(__writePost({
                author: temp.author.current.value,
                category: temp.category.current.value,
                title: temp.title.current.value,
                content: temp.content.current.value,
                password: temp.password.current.value
            }));
        } else {
            axios.patch(`http://localhost:3001/posts/${id}`, {
                    ...post,
                    author: temp.author.current.value,
                    category: temp.category.current.value,
                    title: temp.title.current.value,
                    content: temp.content.current.value,
                    password: temp.password.current.value
                })
        }

        navigate('/')
    }  

    const onClickCancle = () => {
        history.back();
        // navigate('/');
    }
    
    return <>
            <PostWriteSection>
                <form onSubmit={onSubmitHandler}>
                    <ul>
                        <li>
                            <div>카테고리</div>
                            <select name="category" ref={temp.category} defaultValue={post.category} key={post.category}>
                                <option value="CATEGORY1">CATEGORY1</option>
                                <option value="CATEGORY2">CATEGORY2</option>
                                <option value="CATEGORY3">CATEGORY3</option>
                            </select>
                        </li>
                        <li>
                            <div>이름</div>
                            <input type="text" name="author" ref={temp.author} defaultValue={post.author}/>
                        </li>
                        <li>
                            <div>제목</div>
                            <input type="text" name="title" ref={temp.title} defaultValue={post.title}/>
                        </li>
                        <li>
                            <div />
                            <textarea name="content" ref={temp.content} defaultValue={post.content}/>
                        </li>
                        <li>
                            <div>비밀번호</div>
                            <input type="password" name="password" ref={temp.password}/>
                        </li>
                    </ul>
                    <div className='btnwrap'>
                        <NewButton type="submit" value="완료"/>
                        <NewButton value="취소" onClick={onClickCancle}/>
                    </div>
                </form>
            </PostWriteSection>
            </>
}

export default PostWrite
