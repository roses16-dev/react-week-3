import styled from "styled-components";
import NewButton from "../newbutton/NewButton";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { __getPost } from "../../redux/modules/postsSlice";
import axios from "axios";
import "./style.css";

import { Box, Modal } from '@material-ui/core'

function PostDetail({ id }) {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const temp = useSelector((state) => state.posts.post);


    useEffect( () => {
        dispatch(__getPost(id))

        return () => dispatch(__getPost())
    }, [])

    const modifyPwRef = useRef();
    const deletePwRef = useRef();

    const onClickDelete = () => {
        if(deletePwRef.current.value !== temp.password) {
            alert('비밀번호를 다시 확인해주세요.')
            return;
        }
        try{
            axios.delete(`${process.env.REACT_APP_APIADDRESS}/posts/${id}`)
        } catch (error) {
            console.log(`Detail : onClickDelete에서 오류 ${error}`)
        } finally {
            navigation('/')
        }

    }

    const onClickModify = (event) => {
        if(modifyPwRef.current.value !== temp.password) {
            alert('비밀번호를 다시 확인해주세요.')
            return;
        }
        navigation(`/modify/${id}`);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    const [openModifyModal, setOpenModifyModal] = useState(false);
    const handleOpenModifyModal = () => setOpenModifyModal(true);
    const handleCloseModifyModal = () => setOpenModifyModal(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

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
                className="btntest"
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
                        비밀번호 : <input type="password" ref={modifyPwRef}/> <NewButton type="button" value="확인" onClick={onClickModify}/>
                    </Box>
                </Modal>

                <NewButton type="button" value="삭제하기" onClick={handleOpenDeleteModal} />
                <Modal
                    open={openDeleteModal}
                    onClose={handleCloseDeleteModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        비밀번호 : <input type="password" ref={deletePwRef}/> <NewButton type="button" value="확인" onClick={onClickDelete}/>
                    </Box>
                </Modal>
            </div>
            </div>
        </div>
        </>
    );
}

export default PostDetail;

const PostDetailBox = styled.div`
  width: 100%;
  height: 100%;

  div {
    min-height: 50px;
    margin: 5px;
    white-space: pre-line;
  }

  input {
    margin: 5px;
  }

  .btnWrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;
