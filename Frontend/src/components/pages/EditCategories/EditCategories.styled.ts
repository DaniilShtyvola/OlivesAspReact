import styled from 'styled-components';

export const EditCategoriesWrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin-bottom: 34px;
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


export const EditCategoriesContainer = styled.div`
width: 1120px;
`;

export const EditCategoriesControls = styled.div`
display: flex;
justify-content: space-between;
`;


export const SearchInput = styled.input`
padding: 8px 12px;
border-radius: 8px;
width: 340px;
border: 1px solid #ccc;
font-size: 16px;

&:focus {
    outline: none;
    border-color: #73843D;
}
`;

export const AdminPanelButton = styled.div`
display: flex;
align-items: center;
color: #73843D;
cursor: pointer;
user-select: none;
`;

export const CategoryContainer = styled.div`
border-radius: 18px;
margin-top: 12px;
display: flex;
justify-content: space-between;
border: #CDCDCD 1px solid;
height: 62px;
padding: 20px;
align-items: center;
`;

export const CategoryName = styled.p`
font-weight: 700;
width: 260px;
font-size: 95%;
margin: 0 0 0 4px;
`;

export const CategoryButtons = styled.div`
display: flex;
align-items: center;
margin-right: 32px;
`;

export const CategoryInformation = styled.div`
display: flex;
align-items: center;
`;

export const CategoryContent = styled.p`
width: 260px;
height: 22px;
font-size: 75%;
margin: 0 12px 0 12px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`;

export const EditCategoriesHints = styled.div`
display: flex;
justify-content: space-between;
margin-top: 12px;
`;

export const CategoriesHint = styled.h5`
margin: 0;
font-weight: 700;
margin-left: 32px;
`;

export const ButtonsHint = styled.h5`
margin: 0;
font-weight: 700;
margin-right: 58px;
`;

export const CategoryInput = styled.input`
padding: 4px 4px;
border-radius: 8px;
width: 340px;
border: 1px solid #ccc;
font-size: 16px;

&:focus {
    outline: none;
    border-color: #73843D;
}
`;

export const AddCategoryContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;
