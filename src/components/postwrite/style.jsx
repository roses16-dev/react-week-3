import styled from "styled-components"

export const PostWriteSection = styled.div`
width: 100%;
margin: 0px auto;
div{
    display: inline-block;
    width: 80px;
}
ul{
    list-style: none;
    margin: 0px;
    padding: 0px;

    input {
        width: 95% ;
    }
}
li{
    width: 100%;
    margin: 0px;
    padding: 0px;
}

textarea{
    width: 95%;
    min-height: 400px;
    margin: 5px 0px;
    resize: none;
}

.btnwrap{
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
}
`