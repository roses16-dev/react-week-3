import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getComments } from "../../redux/modules/commentSlice";
import { useState } from "react";
import axios from "axios";

const Comment = ({ id }) => {
  const dispatch = useDispatch();

  const cmt = useSelector((state) => state.comments.comment);
  const loadingtest = useSelector((state) => state.comments.isLoading);

  console.log("코멘트로딩", loadingtest);
  console.log("코멘트페이지", cmt);

  useEffect(() => {
    dispatch(__getComments(id));
    console.log("겟코멘트이펙트");
  }, []);

  return (
    <>
      <div className="comment">
        <strong className="cmt_length">현재 댓글 {cmt.length} 개</strong>
        {!loadingtest && cmt.map((e, i) => <CommentItem key={e.id} e={e} />)}
        <CommentForm id={id} />
      </div>
    </>
  );
};

export default Comment;

const CommentItem = ({ e }) => {
  return (
    <div className="cmtbox">
      <p className="cmt_name">{e.author}</p>
      <p className="cmt_desc">{e.content}</p>
      <button className="mod_btn">수정</button>
      <button className="del_btn">삭제</button>
    </div>
  );
};

const CommentForm = ({ id }) => {
  const commentform = {
    userid: "",
    userpw: "",
    desc: "",
  };

  const [comment, setCmt] = useState(commentform);

  const onCmtChangeHandler = (e) => {
    const { name, value } = e.target;
    setCmt({ ...comment, [name]: value });
    console.log(comment);
  };
  console.log("id넘어오는지 확인", id);

  const addComment = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:3001/comments/`, {
      commentId: id,
      id: Date.now() + "",
      author: comment.userid,
      password: comment.userpw,
      content: comment.desc,
    });
  };

  return (
    <>
      <form className="cmt_form">
        <div className="cmt_writebox">
          <div className="cmt_user">
            <input
              type="text"
              className="cmt_id"
              placeholder="이름"
              name="userid"
              onChange={onCmtChangeHandler}
            />
            <input
              type="password"
              className="cmt_pw"
              placeholder="비밀번호"
              name="userpw"
              onChange={onCmtChangeHandler}
            />
          </div>
          <div className="cmt_write">
            <textarea
              className="cmt_desc"
              name="desc"
              placeholder="댓글을 작성해주세요."
              onChange={onCmtChangeHandler}
            />
          </div>
        </div>
        <button className="cmt_btn" onClick={addComment}>
          댓글등록
        </button>
      </form>
    </>
  );
};
