import styled from 'styled-components';

export const PageFooterWrapper = styled.footer`
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

export const GreenText = styled.span`
color: #73843D;
`;

export const OlioLogo = styled.h2`
margin: 12px 0 12px 0;
font-weight: 800;
font-size: 200%;
`;