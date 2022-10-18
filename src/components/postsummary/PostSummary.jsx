import { PostSummaryBox } from "./style";
import { useNavigate } from "react-router-dom";
import "./style.css";
import NewButton from "../newbutton/NewButton";

function PostSummary({ post }) {
  const navigator = useNavigate();

  return (
    <>
      {/* <PostSummaryBox onClick={onClickHandler}> */}
      <div className="container">
        <div className="write_btn">
          <NewButton
            size="large"
            variant="outlined"
            value="글쓰기"
            onClick={() => {
              navigator("/write");
            }}
          ></NewButton>
        </div>
        <div className="board_table">
          <table>
            <colgroup>
              <col style={{ width: "100px" }} />
              <col style={{ width: "800px" }} />
              <col style={{ width: "110px" }} />
              <col style={{ width: "90px" }} />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>이름</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {post.map((el, i) => (
                <Postlistitem key={el.id} el={el} i={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <span className="spanTitle">{post.title}</span>
            <span className="spanAuthor">{post.author}</span> */}
      {/* </PostSummaryBox> */}
    </>
  );
}

export default PostSummary;

const Postlistitem = ({ el, i }) => {
  const navigator = useNavigate();
  const onClickHandler = (e) => {
    navigator(`/detail/${el.id}`);
  };

  return (
    <tr key={el.id}>
      <td>{i + 1}</td>
      <td className="board_desc_title" onClick={onClickHandler}>
        {el.title}
      </td>
      <td>{el.author}</td>
      <td>0</td>
    </tr>
  );
};
