import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
   CategoryName
} from './CategoryCard.styled.ts';

interface CategoryCardProps {
   name: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name }) => {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate(`/Category/${name}`);
   };

   return (
      <CategoryName onClick={handleClick}>
         {name}
      </CategoryName>
   );
};

export default CategoryCard;