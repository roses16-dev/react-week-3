import { PostWriteSection } from "./style";
import NewButton from "../newbutton/NewButton";
import { useNavigate } from "react-router-dom";
import { __writePost, __getPost } from "../../redux/modules/postsSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

function PostWrite({ id = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formRef = {
        author: useRef(),
        category: useRef(),
        title: useRef(),
        content: useRef(),
        password: useRef(),
    };

    const [ post, setPost ] = useState({
      author: '',
      category: 'CATEGORY1',
      title: '',
      content: '',
      password: '',
  });

  const postData = useSelector(state => state.posts.post);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    
    if(!/^.{2,10}$/.test(formRef.author.current.value)) {
        alert('⛔이름은 2-10자로 적어주세요');
        return
    } 

    if(!/^.{2,20}$/.test(formRef.title.current.value)) {
        alert('⛔제목은 2-20자로 적어주세요');
        return
    } 

    if(!/^.{10,}$/gs.test(formRef.content.current.value)) {
        alert('⛔내용은 10자 이상 적어주세요');
        return
    } 

    if(!/^\d{4,10}$/.test(formRef.password.current.value)) {
        alert('⛔비밀번호는 4-10자 이내 숫자로 적어주세요');
        return
    } 
    
    if(!id) {
        dispatch(__writePost({
            author: formRef.author.current.value,
            category: formRef.category.current.value,
            title: formRef.title.current.value,
            content: formRef.content.current.value,
            password: formRef.password.current.value
        }));
    } else {
        axios.patch(`${process.env.REACT_APP_APIADDRESS}/posts/${id}`, {
                ...post,
                author: formRef.author.current.value,
                category: formRef.category.current.value,
                title: formRef.title.current.value,
                content: formRef.content.current.value,
                password: formRef.password.current.value
            })
    }
    navigate('/');
  }

  const onClickCancle = () => {
    navigate('/');
  }

    useEffect(() => {
      if(id) {
          dispatch(__getPost(id));
          setPost(postData);
      } 
      return () => dispatch(__getPost(id));
    }, [])

    return (
    <>
      <PostWriteSection>
        <form onSubmit={onSubmitHandler}>
          <ul>
            <li>
              <div>카테고리</div>
              <select
                name="category"
                ref={formRef.category}
                defaultValue={post.category}
                key={post.category}
              >
                <option value="CATEGORY1">CATEGORY1</option>
                <option value="CATEGORY2">CATEGORY2</option>
                <option value="CATEGORY3">CATEGORY3</option>
              </select>
            </li>
            <li>
              <div>이름</div>
              <input
                type="text"
                name="author"
                ref={formRef.author}
                defaultValue={post.author}
              />
            </li>
            <li>
              <div>제목</div>
              <input
                type="text"
                name="title"
                ref={formRef.title}
                defaultValue={post.title}
              />
            </li>
            <li>
              <div />
              <textarea
                name="content"
                ref={formRef.content}
                defaultValue={post.content}
              />
            </li>
            <li>
              <div>비밀번호</div>
              <input type="password" name="password" ref={formRef.password} />
            </li>
          </ul>
          <div className="btnwrap">
            <NewButton type="submit" value="완료" variant="outlined"style={{margin:10}}/>
            <NewButton value="취소" variant="outlined" onClick={onClickCancle} />
          </div>
        </form>
      </PostWriteSection>
    </>
  );
}

export default PostWrite;
