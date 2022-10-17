import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getComments } from "../../redux/modules/commentSlice";
import { useState } from "react";
import axios from "axios";
import "./style.css";
import NewButton from "../newbutton/NewButton";

const Comment = ({ id }) => {
  const dispatch = useDispatch();

  const cmt = useSelector((state) => state.comments.comment);
  const loadingtest = useSelector((state) => state.comments.isLoading);

  // console.log("코멘트로딩", loadingtest);
  // console.log("코멘트페이지", cmt);
  const [temp, setTemp] = useState();
  useEffect(() => {
    dispatch(__getComments(id));

    // console.log("겟코멘트이펙트");
  }, []);

  return (
    <>
      <div className="comment">
        <strong className="cmt_length">현재 댓글 {cmt.length} 개</strong>
        {!loadingtest &&
          cmt.map((e, i) => <CommentItem key={e.id} e={e} id={id} />)}
        <CommentForm id={id} />
      </div>
    </>
  );
};

export default Comment;

const CommentItem = ({ e, id }) => {
  const [View, setView] = useState(true);
  const [commentdesc, setcommentdesc] = useState("");

  useEffect(() => {
    setcommentdesc(e.content);
  }, [View]);

  const dispatch = useDispatch();

  //댓글 삭제하기 버튼
  const delComment = () => {
    let test = prompt("비밀번호를 입력해주세요");
    if (e.password === test) {
      axios
        .delete(`http://localhost:3001/comments/${e.id}`)
        .then(dispatch(__getComments(id)))
        .chath((err) => {
          console.log(err.response);
        });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  //댓글 수정하기 버튼
  const ModifyComment = () => {
    let pswcheck = prompt("비밀번호를 입력해주세요");
    e.password === pswcheck
      ? setView(false)
      : alert("비밀번호가 일치하지 않습니다.");
  };

  //댓글 수정하기들어와서 저장하기 버튼
  const ModifySaveComment = () => {
    if (commentdesc == "") {
      alert("빈칸은 안돼용");
    } else {
      axios
        .patch(`http://localhost:3001/comments/${e.id}`, {
          content: commentdesc,
        })
        .then(dispatch(__getComments(id)), setView(true))
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  const CancelComment = () => {
    setView(true);
  };
  const ChangeHandler = (e) => {
    setcommentdesc(e.target.value);
  };

  return (
    <div className="cmtbox">
      <p className="cmt_name">{e.author}</p>
      {View ? (
        <p className="cmt_desc">{e.content}</p>
      ) : (
        <input
          type="text"
          className="cmt_descinput"
          value={commentdesc}
          onChange={ChangeHandler}
        />
      )}
      {View ? (
        <button className="mod_btn" onClick={ModifyComment}>
          수정
        </button>
      ) : (
        <button className="modsave_btn" onClick={ModifySaveComment}>
          저장
        </button>
      )}
      {View ? (
        <button className="del_btn" onClick={delComment}>
          삭제
        </button>
      ) : (
        <button className="can_btn" onClick={CancelComment}>
          취소
        </button>
      )}
    </div>
  );
};

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const commentform = {
    userid: "",
    userpw: "",
    desc: "",
    value: "",
  };

  const [comment, setCmt] = useState(commentform);
  const onCmtChangeHandler = (e) => {
    const { name, value } = e.target;
    setCmt({ ...comment, [name]: value });
    console.log(comment);
  };
  console.log("id넘어오는지 확인", id);

  //댓글 추가하기 요청
  const addComment = (e) => {
    e.preventDefault();
    if (comment.userid == "" || comment.userpw == "" || comment.desc == "") {
      alert("빈칸을 확인해주세요.");
    } else {
      try {
        axios.post(`http://localhost:3001/comments/`, {
          post: id,
          id: Date.now() + "",
          author: comment.userid,
          password: comment.userpw,
          content: comment.desc,
        });
      } finally {
        return setCmt(commentform), dispatch(__getComments(id));
      }
    }
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
              value={comment.userid}
              onChange={onCmtChangeHandler}
            />
            <input
              type="password"
              className="cmt_pw"
              placeholder="비밀번호"
              name="userpw"
              value={comment.userpw}
              onChange={onCmtChangeHandler}
            />
          </div>
          <div className="cmt_write">
            <textarea
              className="cmt_desc"
              name="desc"
              placeholder="댓글을 작성해주세요."
              value={comment.desc}
              onChange={onCmtChangeHandler}
            />
          </div>
        </div>
        <NewButton
          size="large"
          color="success"
          className="cmt_btn"
          onClick={addComment}
          value="댓글등록"
        >
          댓글등록
        </NewButton>
      </form>
    </>
  );
};
