import styled from 'styled-components';

export const PolicyModalWrapper = styled.div`
`;

export const PolicyModalCloseButton = styled.div`
cursor: pointer;
`;

export const GreenText = styled.span`
color: #73843D;
`;

export const Title = styled.h1`
font-size: 240%;
font-weight: 700;
margin: 8px 0 16px 22px;
font-size: 280%;
`;

export const PolicyText = styled.div`
overflow: auto;
padding: 18px;
height: 280px;
border-radius: 12px;
box-shadow: 0 0px 12px rgba(0, 0, 0, 0.6);
margin: 0 18px;
font-weight: 600;
`;

export const PolicyModalHeader = styled.div`
display: flex;
`;

export const PolicyModalFooter = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 24px;
`;

export const ConfirmButton = styled.button`
width: 168px;
padding: 8px;
border-radius: 8px;
background-color: #73843D;
border: none;
color: white;
font-size: 16px;
margin: 12px 0 28px 0;
cursor: pointer;

&:hover {
    background-color: #5f6d31;
}
&:disabled {
    background-color: lightgray;
    cursor: default;
}
`;


export const ConfirmLabel = styled.label`
display: flex;
`;


export const CheckBox = styled.div`
padding: 4px;
width: 27px;
height: 27px;
border: 2px #73843D solid;
border-radius: 4px;
display: flex;
justify-content: center;
align-items: center;
transition: background-color 0.3s ease;
margin-right: 12px;
`;

