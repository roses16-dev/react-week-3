import styled from "styled-components";
import NewButton from "../newbutton/NewButton";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <HeaderSection>
        <div className="titleWrap">
          <h1>자유게시판</h1>
          <h3>React 3주차 팀과제 : B반 4조 </h3>
        </div>
      </HeaderSection>
    </>
  );
}

export default Header;

const HeaderSection = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;

  .titleWrap {
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    text-align: center;
  }

  .writeWrap {
    text-align: right;
    float: right;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;
