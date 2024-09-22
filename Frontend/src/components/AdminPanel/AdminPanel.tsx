import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import {
   AdminPanelWrapper,
   AdminPanelContainer,
   Title,
   GreenText,
   AdminPanelControls,
   SearchInput,
   PublishNewsButton,
   NewsContainer,
   NewsImage,
   NewsTitle,
   NewsDate,
   NewsButtons,
   NewsInformation
} from './AdminPanel.styled.ts';

import { PublishNewsIcon } from '../Icons/Icons.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import newsData from '../news.json';

interface AdminPanelProps {}

interface NewsItem {
   id: number;
   title: string;
   image: string;
   content: string;
   publisher: string;
   publisherIcon: string;
   publishDate: string;
}

const AdminPanel: FC<AdminPanelProps> = () => {
   const [searchString, setSearchString] = useState('');
   const [news, setNews] = useState<NewsItem[]>([]);

   useEffect(() => {
      const fetchNews = async () => {
         try {
            /*const response = await axios.get('http://aspsmarteroil1-001-site1.ktempurl.com/api/news', {
               headers: {
                  "Authorization": 'Basic MTExOTU2OTk6NjAtZGF5ZnJlZXRyaWFs'
               }
            })

            const items = response.data as NewsItem[];
            */
           
            const items = newsData as NewsItem[];

            setNews(items);
         } catch (error) {
            console.error('Error fetching news data:', error);
         }
      };

      fetchNews();
   }, []);

   const handleSearchStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchString(e.target.value);
   };

   const handleDeleteNews = (id: number) => {
      const updatedNews = news.filter((newsItem) => newsItem.id !== id);
      setNews(updatedNews); // Delete news from array
   };

   const filteredNews = news.filter((newsItem) =>
      newsItem.title.toLowerCase().includes(searchString.toLowerCase())
   );

   return (
      <AdminPanelWrapper>
         <AdminPanelContainer>
            <Title>
               Admin <GreenText>panel</GreenText>
            </Title>
            <AdminPanelControls>
               <SearchInput
                  onChange={handleSearchStringChange}
                  placeholder="Search..."
               />
               <PublishNewsButton>
                  <PublishNewsIcon /> Publish news
               </PublishNewsButton>
            </AdminPanelControls>

            {filteredNews.map((newsItem) => (
               <NewsContainer key={newsItem.id}>
                  <NewsInformation>
                     <NewsImage src={newsItem.image} alt={newsItem.title} />
                     <NewsTitle>{newsItem.title}</NewsTitle>
                     <NewsDate>
                        {new Date(newsItem.publishDate).toLocaleDateString()}
                     </NewsDate>
                  </NewsInformation>
                  <NewsButtons>
                     <FontAwesomeIcon
                        style={{
                           fontSize: '120%',
                           color: '#73843D',
                           cursor: 'pointer',
                        }}
                        icon={faTrash}
                        onClick={() => handleDeleteNews(newsItem.id)}
                     />
                  </NewsButtons>
               </NewsContainer>
            ))}
         </AdminPanelContainer>
      </AdminPanelWrapper>
   );
};

export default AdminPanel;
