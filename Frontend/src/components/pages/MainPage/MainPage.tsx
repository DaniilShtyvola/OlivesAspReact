import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import {
   MainPageWrapper,
   NewsFeedCardsContainer,
   NewsRightSide,
   TodayNewsCardsContainer,
   News,
   NewsContainer,
   NewsTitle,
   GreenText,
   CategoriesContainer
} from './MainPage.styled.ts';

import { BigCard, DefaultCard } from '../../elements/Cards/Cards.tsx';
import CategoryCard from '../../elements/CategoryCard/CategoryCard.tsx';

import { apiUrl } from '../../config.ts';

interface MainPageProps { }

interface NewsItem {
   id: number;
   title: string;
   icon: string;
   content: string;
   publisher: string;
   publisherIcon: string;
   publishDate: string;
   category: number;
}

interface Category {
   id: number;
   name: string;
}

const MainPage: FC<MainPageProps> = () => {
   const [bigNews, setBigNews] = useState<NewsItem | null>(null);
   const [todayNews, setTodayNews] = useState<NewsItem[]>([]);
   const [newsFeed, setNewsFeed] = useState<NewsItem[]>([]);

   const [categories, setCategories] = useState<Category[]>([]);

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
            const response = await axios.get(`${apiUrl}/api/news`)
            const items = response.data as NewsItem[];

            const bigCard = items.length > 0 ? items[0] : null;
            const todayNewsCards = items.slice(1, 4);
            const newsFeedCards = items.slice(4);

            setBigNews(bigCard);
            setTodayNews(todayNewsCards);
            setNewsFeed(newsFeedCards);

            const categoryResponse = await axios.get(`${apiUrl}/api/category`)
            const categoryItems = categoryResponse.data as Category[];
            setCategories(categoryItems);
         } catch (error) {
            console.error('Error fetching news data:', error);
         }
      };

      fetchNews();
   }, []);

   return (
      <MainPageWrapper>
         <News>
            <NewsContainer>
               <NewsTitle>{language === 'EN' ? 'Today in the' : 'Сьогодні у'} <GreenText>{language === 'EN' ? 'news' : 'новинах'}</GreenText></NewsTitle>
               <CategoriesContainer>
                  {categories.map(item => (
                     <CategoryCard
                        key={item.id}
                        name={item.name}
                     />
                  ))}
               </CategoriesContainer>
               <TodayNewsCardsContainer>
                  {bigNews && (
                     <BigCard
                        news={bigNews}
                     />
                  )}
                  <NewsRightSide>
                     {todayNews.map(item => (
                        <DefaultCard
                           key={item.id}
                           news={item}
                        />
                     ))}
                  </NewsRightSide>
               </TodayNewsCardsContainer>
               <NewsTitle>{language === 'EN' ? null : 'Стрічка'} <GreenText>{language === 'EN' ? 'News' : 'новин'}</GreenText> {language === 'EN' ? 'feed' : null}</NewsTitle>
               <NewsFeedCardsContainer>
                  {newsFeed.map(item => (
                     <DefaultCard
                        key={item.id}
                        news={item}
                     />
                  ))}
               </NewsFeedCardsContainer>
            </NewsContainer>
         </News>
      </MainPageWrapper>
   );
};

export default MainPage;