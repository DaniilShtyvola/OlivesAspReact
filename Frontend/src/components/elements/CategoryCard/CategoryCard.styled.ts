import styled from 'styled-components';

export const CategoryName = styled.h5`
color: #73843D;
cursor: pointer;
font-weight: 600;
margin-left: 12px;
margin-bottom: 16px;
position: relative;
display: inline-block;

&::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #73843D;
    transition: width 0.3s ease-in-out;
}

&:hover::after {
    width: 100%;
}
`;