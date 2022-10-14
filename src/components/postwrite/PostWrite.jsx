import { PostWriteSection } from './styled'
import { useNavigate } from "react-router-dom"
import { __writePost } from '../../redux/modules/postsSlice'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from 'react'

function PostWrite(){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        if(!/^.{2,10}$/.test(event.target.author.value)) {
            alert('⛔이름은 2-10자로 적어주세요');
            return
        } 

        if(!/^.{2,20}$/.test(event.target.title.value)) {
            alert('⛔제목은 2-20자로 적어주세요');
            return
        } 

        if(!/^.{10,}$/gm.test(event.target.content.value)) {
            alert('⛔내용은 10자 이상 적어주세요');
            return
        } 

        if(!/^\d{4,10}$/.test(event.target.password.value)) {
            alert('⛔비밀번호는 4-10자 이내 숫자로 적어주세요');
            return
        } 

        const temp = {
            author: event.target.author.value,
            password: event.target.password.value,
            category: event.target.category.value,
            title: event.target.title.value,
            content: event.target.content.value
        }

        dispatch(__writePost(temp));
        navigate('/')
    }  

    const onClickCancle = () => {
        navigate('/');
    }

    return <>
            <PostWriteSection>
                <form onSubmit={onSubmitHandler}>
                    <ul>
                        <li>
                            <div>카테고리</div>
                            <select name="category">
                                <option value="CATEGORY1">CATEGORY1</option>
                                <option value="CATEGORY2">CATEGORY2</option>
                                <option value="CATEGORY3">CATEGORY3</option>
                            </select>
                        </li>
                        <li>
                            <div>이름</div>
                            <input type="text" name="author" />
                        </li>
                        <li>
                            <div>제목</div>
                            <input type="text" name="title" />
                        </li>
                        <li>
                            <div />
                            <textarea name="content" />
                        </li>
                        <li>
                            <div>비밀번호</div>
                            <input type="password" name="password" />
                        </li>
                    </ul>
                    <div className='btnwrap'>
                        <input type="submit" value="완료" className="btn"/>
                        <input type="button" value="취소" className="btn" onClick={onClickCancle}/>
                    </div>
                </form>
            </PostWriteSection>
            </>
}

export default PostWrite
