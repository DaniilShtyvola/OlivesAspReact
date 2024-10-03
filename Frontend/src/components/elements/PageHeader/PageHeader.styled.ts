import styled from 'styled-components';

export const PageHeaderWrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
border-bottom: solid 1px #73843D;
`;

export const HeaderContainer = styled.div`
display: flex;
width: 1120px;
justify-content: space-between;
align-items: center;
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

export const HeaderIconsContainer = styled.div`
display: flex;
cursor: pointer;
`;