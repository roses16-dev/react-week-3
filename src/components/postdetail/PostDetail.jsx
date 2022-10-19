import NewButton from "../newbutton/NewButton";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { __getPost, __addHits } from "../../redux/modules/postsSlice";
import axios from "axios";
import "./style.css";

import { Box, Modal } from "@material-ui/core";

function PostDetail({ id }) {

    const navigation = useNavigate();
    const dispatch = useDispatch();
    
    const temp = useSelector((state) => state.posts.post);

    // Delete Modal 및 onClick Event 함수
    const deletePwRef = useRef();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const onClickDelete = () => {
        if (deletePwRef.current.value !== temp.password) {
            alert("비밀번호를 다시 확인해주세요.");
            return;
        }
        try {
            axios.delete(`${process.env.REACT_APP_APIADDRESS}/posts/${id}`);
        } catch (error) {
            console.log(`Detail : onClickDelete에서 오류 ${error}`);
        } finally {
            navigation("/");
        }
    };

    // Modify Modal 및 onClick Event 함수
    const modifyPwRef = useRef();
    const [openModifyModal, setOpenModifyModal] = useState(false);
    const handleOpenModifyModal = () => setOpenModifyModal(true);
    const handleCloseModifyModal = () => setOpenModifyModal(false);

    const onClickModify = (event) => {
        if (modifyPwRef.current.value !== temp.password) {
            alert("비밀번호를 다시 확인해주세요.");
            return;
        }
        navigation(`/modify/${id}`);
    };

    // Modal Style
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

  useEffect(() => {
    dispatch(__getPost(id))
    return () => {
        dispatch(__getPost());
    }
  }, []);
  
  useEffect(() => {
    axios.patch(`${process.env.REACT_APP_APIADDRESS}/posts/${id}`, { hits: temp.hits + 1 }, [temp])
  }, [temp])

  return (
    <>
      <div className="container2">
        <div className="board_inner">
          <div className="board_title">
            <h5>{temp.category}</h5>
            <h2>{temp.title}</h2>
            <h4>{temp.author}</h4>
          </div>
          <div className="board_desc">
            <p>{temp.content}</p>
          </div>
          <div className="btnWrap">
            <NewButton
              color="inherit"
              variant="outlined"
              type="button"
              value="수정하기"
              onClick={handleOpenModifyModal}
            />
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

            <NewButton
              color="secondary"
              variant="outlined"
              type="button"
              value="삭제하기"
              onClick={handleOpenDeleteModal}
            />
            <Modal
              open={openDeleteModal}
              onClose={handleCloseDeleteModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                비밀번호 : <input type="password" ref={deletePwRef} />{" "}
                <NewButton type="button" value="확인" onClick={onClickDelete} />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
