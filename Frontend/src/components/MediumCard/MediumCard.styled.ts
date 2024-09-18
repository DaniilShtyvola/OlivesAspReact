import styled from 'styled-components';

export const MediumCardWrapper = styled.div`
width: 352px;
height: 329px;
margin-top: 24px;
user-select: none;
cursor: pointer;
`;

export const InfoContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 125px;
`;

export const Title = styled.h2`
margin-top: 12px;
`;

export const NewsPicture = styled.div`
height: 204px;
width: 352px;
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
`;

export const PublisherName = styled.p`
margin: 0;
font-weight: 500;
`;

export const Publisher = styled.div`
display: flex;
align-items: center;
font-size: 90%;
`;

