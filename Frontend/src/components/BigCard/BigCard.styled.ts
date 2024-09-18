import styled from 'styled-components';

export const MainCardWrapper = styled.div`
width: 544px;
height: 472px;
`;

export const InfoContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 156px;
`;

export const Title = styled.h1`
margin: 0;
font-size: 220%;
`;

export const NewsPicture = styled.div`
height: 316px;
width: 544px;
border-radius: 16px;
background-size: cover;
background-position: center;
background-repeat: no-repeat;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const BottomInfo = styled.div`
display: flex; 
justify-content: space-between;
`;

export const PublisherIcon = styled.div`
height: 42px;
width: 42px;
margin-right: 4px;
border-radius: 100%;
background-size: cover;
background-position: center;
background-repeat: no-repeat;
`;

export const NewsTime = styled.p`
color: #AFAFAF;
margin: 0 0 0 8px;
font-size: 90%;
`;

export const NewsDate = styled.p`
margin: 0;
font-size: 120%;
`;

export const PublisherName = styled.p`
margin: 0;
font-weight: 500;
`;

export const Publisher = styled.div`
display: flex;
align-items: center;
font-size: 120%;
`;

