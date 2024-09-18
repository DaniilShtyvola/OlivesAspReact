import styled from 'styled-components';

export const CardWrapper = styled.div`
width: 544px;
display: flex;
justify-content: space-between;
user-select: none;
cursor: pointer;
`;

export const InfoContainer = styled.div`
width: 270px;
display: flex;
flex-direction: column;
justify-content: space-between;
margin: 6px 0 6px 0;
`;

export const Title = styled.h2`
margin: 0;
`;

export const NewsPicture = styled.div`
height: 150px;
width: 258px;
border-radius: 16px;
background-size: cover;
background-position: center;
background-repeat: no-repeat;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const BottomInfo = styled.div`
display: flex; 
justify-content: space-between;
align-items: center;
`;

export const PublisherIcon = styled.div`
height: 25px;
width: 25px;
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
font-size: 80%;
`;

export const PublisherName = styled.p`
margin: 0;
font-weight: 500;
`;

export const Publisher= styled.div`
display: flex;
align-items: center;
font-size: 80%;
`;

