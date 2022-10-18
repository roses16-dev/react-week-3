import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getComments } from "../../redux/modules/commentSlice";
import { useState } from "react";
import axios from "axios";
import "./style.css";
import NewButton from "../newbutton/NewButton";
import { Box, Modal } from "@material-ui/core";

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
    console.log(deletePwRef.current.value);
    if (e.password === deletePwRef.current.value) {
      axios
        .delete(`${process.env.REACT_APP_APIADDRESS}/comments/${e.id}`)
        .then((response) => {
          dispatch(__getComments(id));
        })
        .chath((err) => {
          console.log(err.response);
        });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  //댓글 수정하기 버튼
  const onClickModify = () => {
    console.log(modifyPwRef.current.value);
    if (e.password == modifyPwRef.current.value) {
      return setView(false), setOpenModifyModal(false);
    } else {
      alert("비밀번호가 달라요.");
    }
  };

  //댓글 수정하기들어와서 저장하기 버튼
  const ModifySaveComment = () => {
    if (commentdesc == "") {
      alert("빈칸은 안돼용");
    } else {
      axios
        .patch(`${process.env.REACT_APP_APIADDRESS}/comments/${e.id}`, {
          content: commentdesc,
        })
        .then((response) => {
          setView(true);
          dispatch(__getComments(id));
        })
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [openModifyModal, setOpenModifyModal] = useState(false);
  const handleOpenModifyModal = () => setOpenModifyModal(true);
  const handleCloseModifyModal = () => setOpenModifyModal(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const modifyPwRef = useRef();
  const deletePwRef = useRef();

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
      <div className="cmtbtn_wrap">
        {View ? (
          <NewButton
            variant="outlined"
            size="small"
            value="수정"
            onClick={handleOpenModifyModal}
          >
            수정
          </NewButton>
        ) : (
          <NewButton
            variant="outlined"
            value="저장"
            onClick={ModifySaveComment}
          >
            저장
          </NewButton>
        )}
        <Modal
          open={openModifyModal}
          onClose={handleCloseModifyModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            비밀번호 : <input type="password" ref={modifyPwRef} />{" "}
            <NewButton type="button" value="확인" onClick={onClickModify} />
          </Box>
        </Modal>
        {View ? (
          <NewButton
            color="secondary"
            variant="outlined"
            value="삭제"
            onClick={handleOpenDeleteModal}
          >
            삭제
          </NewButton>
        ) : (
          <NewButton variant="outlined" value="취소" onClick={CancelComment}>
            취소
          </NewButton>
        )}
        <Modal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            비밀번호 : <input type="password" ref={deletePwRef} />{" "}
            <NewButton type="button" value="확인" onClick={delComment} />
          </Box>
        </Modal>
      </div>
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
      axios
        .post(`${process.env.REACT_APP_APIADDRESS}/comments/`, {
          post: id,
          id: Date.now() + "",
          author: comment.userid,
          password: comment.userpw,
          content: comment.desc,
        })
        .then((response) => {
          console.log("나리스폰이야", response);
          setCmt(commentform);
          dispatch(__getComments(id));
        });
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
        <div className="cmt_addbtn">
          <NewButton
            size="large"
            variant="outlined"
            onClick={addComment}
            value="댓글등록"
          >
            댓글등록
          </NewButton>
        </div>
      </form>
    </>
  );
};
