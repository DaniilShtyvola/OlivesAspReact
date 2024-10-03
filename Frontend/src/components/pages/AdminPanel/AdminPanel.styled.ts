import styled from 'styled-components';

export const AdminPanelWrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin-bottom: 34px;
`;

export const Title = styled.h1`
font-size: 24px;
font-weight: 700;
color: black;
font-size: 240%;
margin: 32px 0 22px 0;
`;

export const GreenText = styled.span`
color: #73843D;
`;


export const AdminPanelContainer = styled.div`
width: 1120px;
`;

export const AdminPanelControls = styled.div`
display: flex;
justify-content: space-between;
`;


export const SearchInput = styled.input`
padding: 8px 12px;
border-radius: 8px;
width: 340px;
border: 1px solid #ccc;
font-size: 16px;

&:focus {
    outline: none;
    border-color: #73843D;
}
`;

export const PublishNewsButton = styled.div`
display: flex;
align-items: center;
color: #73843D;
cursor: pointer;
user-select: none;
`;

export const NewsContainer = styled.div`
border-radius: 18px;
margin-top: 12px;
display: flex;
justify-content: space-between;
border: #CDCDCD 1px solid;
height: 110px;
padding: 20px;
`;

export const NewsImage = styled.img`
border-radius: 12px;
width: 110px;
height: 64px;
`;

export const NewsTitle = styled.p`
font-weight: 700;
width: 260px;
font-size: 95%;
margin: 0 12px 0 12px;
`;

export const NewsDate = styled.p`
margin: 0 0 0 12px;
`;

export const NewsButtons = styled.div`
display: flex;
align-items: center;
margin-right: 32px;
`;

export const NewsInformation = styled.div`
display: flex;
align-items: center;
`;

export const NewsContent = styled.p`
width: 260px;
height: 22px;
font-size: 75%;
margin: 0 12px 0 12px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`;

export const AdminPanelHints = styled.div`
display: flex;
justify-content: space-between;
margin-top: 12px;
`;

export const NewsHint = styled.h5`
margin: 0;
font-weight: 700;
margin-left: 32px;
`;

export const ButtonsHint = styled.h5`
margin: 0;
font-weight: 700;
margin-right: 58px;
`;

export const DateHint = styled.h5`
margin: 0;
font-weight: 700;
margin-left: 358px;
`;