import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import {
   OpenedNewsWrapper,
   OpenedNewsContainer,
   OpenedNewsRightSide,
   GreenText,
   SmallNewsTitle
} from './OpenedNews.styled.ts';
import { useParams } from 'react-router-dom';

import { OpenedCard, MediumCard } from '../../elements/Cards/Cards.tsx';

import { apiUrl } from '../../config.ts';

interface NewsItem {
   id: number;
   title: string;
   image: string;
   content: string;
   publisher: string;
   publisherIcon: string;
   publishDate: string;
}

interface OpenedNewsProps { }

const OpenedNews: FC<OpenedNewsProps> = () => {
   const [news, setNews] = useState<NewsItem[]>([]);

   const { newsId } = useParams();
   const [openedNews, setOpenedNews] = useState<NewsItem | null>(null);

   useEffect(() => {
      const fetchNews = async () => {
         try {
            const openedNewsResponse = await axios.get(`${apiUrl}/api/news/${newsId}`)
            setOpenedNews(openedNewsResponse.data as NewsItem);

            const response = await axios.get(`${apiUrl}/api/news`)
            const items = response.data as NewsItem[];

            const filteredItems = items.filter(item => item.id !== Number(newsId));
            setNews(filteredItems.slice(0, 3));
         } catch (error) {
            console.error('Error fetching news data:', error);
         }
      };

      fetchNews();
   }, [newsId]);

   return (
      <OpenedNewsWrapper>
         <OpenedNewsContainer>
            {openedNews && (
               <OpenedCard
                  news={openedNews}
               />
            )}
            <OpenedNewsRightSide>
               <SmallNewsTitle>Other <GreenText>news</GreenText></SmallNewsTitle>
               {news.map(item => (
                  <MediumCard
                     key={item.id}
                     news={item}
                  />
               ))}
            </OpenedNewsRightSide>
         </OpenedNewsContainer>
      </OpenedNewsWrapper>
   );
};

export default OpenedNews;
