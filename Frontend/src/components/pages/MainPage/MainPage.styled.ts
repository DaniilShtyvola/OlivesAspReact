import styled from 'styled-components';

export const MainPageWrapper = styled.div`
font-family: 'Montserrat', sans-serif;
`;

export const NewsContainer = styled.div`
width: 1120px;
`;

export const News = styled.div`
width: 100%;
display: flex;
justify-content: center;
`;

export const NewsTitle = styled.h1`
margin: 32px 0 8px 0;
font-size: 240%;
font-weight: 700;
`;

export const GreenText = styled.span`
color: #73843D;
`;

export const TodayNewsCardsContainer = styled.div`
display: flex;
justify-content: space-between;
padding-bottom: 32px;
border-bottom: solid 3px #D9D9D9;
`;

export const NewsRightSide = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
`;

export const NewsFeedCardsContainer = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-gap: 22px;
width: 100%;
margin-bottom: 44px;
`;

export const LoginModalCloseContainer = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
padding: 0 12px 0 20px;
margin-top: 12px;
`;

export const LoginModalCloseButton = styled.div`
`;

export const OlioFullLogo = styled.div`
width: 126px;
height: 126px;
background-size: cover;
background-position: center;
background-repeat: no-repeat;
`;

export const LoginModalTitle = styled.h3`
font-weight: 700;
color: #73843D;
`;

export const LoginModalEmailInput = styled.input`
width: 100%;
padding: 12px 15px;
border-radius: 8px;
border: 1px solid #ccc;
font-size: 16px;
  margin: 20px 0 20px 0;

&:focus {
    outline: none;
    border-color: #73843D;
}
`;

export const LoginModalSubmitButton = styled.button`
width: 168px;
padding: 8px;
border-radius: 8px;
background-color: #73843D;
border: none;
color: white;
font-size: 16px;
margin-bottom: 20px;
cursor: pointer;

&:hover {
    background-color: #5f6d31;
}
`;

export const LoginModalDivider = styled.div`
display: flex;
align-items: center;
margin: 8px 0;
font-weight: 700;
font-size: 14px;
`;

export const LoginModalAppIcons = styled.div`
display: flex;
margin: 20px 0;
`;

export const LoginModalAppIcon = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 60px;
height: 60px;
border-radius: 100%;
border: 1.5px solid #ddd;
margin: 0 6px;
cursor: pointer;

&:hover {
    border-color: #73843D;
}
img {
    width: 25px;
    height: 25px;
}
`;

export const LoginModalRegisterFooter = styled.p`
font-size: 14px;
font-weight: 700;
font-size: 100%;
`;

export const LoginModalRegisterButton = styled.a`
color: #73843D;
text-decoration: underline;
cursor: pointer;
&:hover {
    color: #5f6d31;
}
`;

export const LoginModalDividerLine = styled.div`
width: 170px;
height: 1px;
background-color: #BDBDBD;
margin: 0 12px 0 12px;
`;

export const CategoriesContainer = styled.div`
display: flex;
`;

