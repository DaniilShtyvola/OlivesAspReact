import styled from 'styled-components';

export const MainPageWrapper = styled.div`
font-family: 'Montserrat', sans-serif;
`;

export const HeaderContainer = styled.div`
display: flex;
width: 1120px;
justify-content: space-between;
align-items: center;
`;

export const Header = styled.header`
width: 100%;
display: flex;
justify-content: center;
border-bottom: solid 1px #73843D;
`;

export const SelectLanguage = styled.div`
display: flex;
align-items: center;
`;

export const LanguageOption = styled.h5`
margin: 0;
margin-left: 4px;
font-weight: 700;
padding: 0 2px 0 2px;
user-select: none;
cursor: pointer;
`;

export const OlioLogo = styled.h2`
margin: 12px 0 12px 0;
font-weight: 800;
font-size: 200%;
`;

export const PlanetIcon = styled.div`
color: #73843D;
font-size: 160%;
margin-right: 4px;
`;

export const LoginButton = styled.div`
color: #73843D;
font-size: 160%;
padding-left: 61.7px;
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
margin: 32px 0 22px 0;
font-size: 240%;
font-weight: 700;
`;

export const SmallNewsTitle = styled.h1`
margin: 32px 0 22px 0;
font-size: 140%;
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

export const Footer = styled.footer`
width: 100%;
display: flex;
justify-content: center;
border-bottom: solid 1px #73843D;
background-color: #2F2F2F;
color: white;
`;

export const FooterContainer = styled.div`
display: flex;
width: 1120px;
padding: 12px 0 22px 0;
justify-content: space-between;
`;

export const ContactsColumn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-left: 120px;
`;

export const PolicyColumn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 22px;
`;

export const AppsColumn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 16px;
margin-right: 120px;
`;

export const FooterLink = styled.div`
margin-top: 16px;
color: #FFFFFF;
user-select: none;
cursor: pointer;
`;

export const BottomFooterText = styled.div`
text-align: center;
color: #FFFFFF;
margin-top: 44px;
`;

export const AppButton = styled.div`
background-color: #97B734;
border-radius: 84px;
padding: 8px 42px 8px 42px;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 22px;
cursor: pointer;
`;

export const DownloadText = styled.div`
font-size: 60%;
user-select: none;
`;

export const AppIcon = styled.div`
font-size: 120%;
`;

export const OpenedNews = styled.div`
width: 100%;
display: flex;
justify-content: center;
`;

export const OpenedNewsContainer = styled.div`
margin-top: 48px;
width: 1120px;
display: flex;
justify-content: space-between;
`;

export const OpenedNewsRightSide = styled.div`
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