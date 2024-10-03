import styled from 'styled-components';

export const PublishNewsWrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin-bottom: 34px;
`;

export const PublishNewsContainer = styled.div`
width: 1120px;
`;

export const NewsTitleInput = styled.textarea`
padding: 8px 12px;
border-radius: 8px;
width: 640px;
height: 80px;
border: 1px solid #ccc;
font-size: 16px;

&:focus {
    outline: none;
    border-color: #73843D;
}
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


export const NewsContentInput = styled.textarea`
padding: 8px 12px;
border-radius: 8px;
height: 458px;
margin-top: 12px;
width: 640px;
border: 1px solid #ccc;
font-size: 16px;

&:focus {
    outline: none;
    border-color: #73843D;
}
`;

export const NewsImageInput = styled.input`
padding: 8px 12px;
border-radius: 8px;
width: 448px;
border: 1px solid #ccc;
font-size: 16px;

&:focus {
    outline: none;
    border-color: #73843D;
}
`;

export const InputsContainer = styled.div`
display: flex; 
flex-direction: column;
`;

export const SubmitButton = styled.button`
flex: 1;
padding: 8px;
margin-left: 12px;
border-radius: 8px;
background-color: #73843D;
border: none;
color: white;
font-size: 16px;
cursor: pointer;

&:hover {
    background-color: #5f6d31;
}
`;

export const NewsImage = styled.img`
width: 448px;
border-radius: 20px;
height: 260px;
margin-bottom: 22px;
box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
background-repeat: no-repeat;
`;

export const MainContainer = styled.div`
display: flex; 
justify-content: space-between;
`;
