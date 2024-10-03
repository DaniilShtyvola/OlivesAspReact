import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import {
   OpenedCategoryWrapper,
   OpenedCategoryContainer,
   NewsTitle,
   GreenText,
   NewsContainer
} from './OpenedCategory.styled.ts';
import { useParams } from 'react-router-dom';

import { DefaultCard } from '../../elements/Cards/Cards.tsx';

import { apiUrl } from '../../config.ts';

interface OpenedCategoryProps { }

interface NewsItem {
   id: number;
   title: string;
   icon: string;
   content: string;
   publisher: string;
   publisherIcon: string;
   publishDate: string;
   category: number;
   categoryId: number;
}

interface Category {
   id: number;
   name: string;
}

const OpenedCategory: FC<OpenedCategoryProps> = () => {
   const [news, setNews] = useState<NewsItem[]>([]);

   const { categoryName } = useParams();

   const [language, setLanguage] = useState(window.pageLanguage || "EN");

   useEffect(() => {
      const handleLanguageUpdate = (event: any) => {
         setLanguage(window.pageLanguage);
      };

      window.addEventListener("languageChange", handleLanguageUpdate);
   }, []);

   useEffect(() => {
      const fetchNews = async () => {
         try {
            const categoriesResponse = await axios.get(`${apiUrl}/api/category`);
            const categoriesItems = categoriesResponse.data as Category[];

            if (categoryName) {
               const foundCategory = categoriesItems.find(category => category.name.toLowerCase() === categoryName.toLowerCase());

               if (foundCategory) {
                  const categoryId = foundCategory.id;
   
                  const newsResponse = await axios.get(`${apiUrl}/api/news`);
                  const items = newsResponse.data as NewsItem[];
   
                  const filteredItems = items.filter(item => item.categoryId === categoryId);
                  setNews(filteredItems);
               }
            }
         } catch (error) {
            console.error('Error fetching news data:', error);
         }
      };

      fetchNews();
   }, []);

   return (
      <OpenedCategoryWrapper>
         <OpenedCategoryContainer>
            <NewsTitle>{language === 'EN' ? 'Category' : 'Категорія'} <GreenText>{categoryName?.toLowerCase()}</GreenText></NewsTitle>
            <NewsContainer>
               {news.map(item => (
                  <DefaultCard
                     key={item.id}
                     news={item}
                  />
               ))}
            </NewsContainer>
         </OpenedCategoryContainer>
      </OpenedCategoryWrapper>
   );
}

export default OpenedCategory;
