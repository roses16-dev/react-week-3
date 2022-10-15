import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getComments } from "../../redux/modules/commentSlice";

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
      {!loadingtest &&
        cmt.map((e, i) => <CommentItem key={e.commentId} e={e} />)}
    </>
  );
};

export default Comment;

const CommentItem = ({ e }) => {
  return (
    <div className="comment">
      <div className="cmtbox">
        <div className="cmt">
          <p className="cmt_name">{e.author}</p>
          <p className="cmt_desc">{e.content}</p>
        </div>
        <div className="cmt_btnbox">
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
    </div>
  );
};
