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
   NewsInformation,
   NewsTitleInput,
   NewsContentInput,
   NewsImageInput,
   PublishNewsContainer,
   SubmitButton
} from './AdminPanel.styled.ts';

import { PublishNewsIcon } from '../Icons/Icons.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { apiUrl } from '../config.ts';

interface AdminPanelProps { }

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

   const [login, setLogin] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);

   const [publishNews, setPublishNews] = useState(false);

   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [image, setImage] = useState("");

   useEffect(() => {
      const fetchNews = async () => {
         try {
            const token = localStorage.getItem('token');
            if (token) {
               setLogin(true);

               const isAdminResponse = await axios.get(`${apiUrl}/api/auth/me`, {
                  headers: {
                     "X-Key": `${token}`
                  }
               });

               if (isAdminResponse.data.isAdmin) {
                  setIsAdmin(true);
               }

               const response = await axios.get(`${apiUrl}/api/news`)
               const items = response.data as NewsItem[];

               setNews(items);
            }
         } catch (error) {
            console.error('Error fetching news data:', error);
         }
      };

      fetchNews();
   }, []);

   const handleSearchStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchString(e.target.value);
   };

   const handleClickSubmit = (e) => {
      // Publish news
   };

   const handleDeleteNews = async (id: number) => {
      try {
         const token = localStorage.getItem('token');
         await axios.delete(`${apiUrl}/api/news/${id}`, {
            headers: {
               "X-Key": `${token}`
            }
         });
         setNews(news.filter((newsItem) => newsItem.id !== id));
      } catch (error) {
         console.error("Error deleting news:", error);
      }
   };

   const filteredNews = news.filter((newsItem) =>
      newsItem.title.toLowerCase().includes(searchString.toLowerCase())
   );

   const handlePublishNews = () => {
      setPublishNews(true);
   };

   const handleTitleChange = (e) => {
      setTitle(e.target.value);
   };

   const handleContentChange = (e) => {
      setContent(e.target.value);
   };

   const handleImageChange = (e) => {
      setImage(e.target.value);
   };

   return (
      <AdminPanelWrapper>
         <AdminPanelContainer>
            {!publishNews && login && isAdmin && (
               <>
                  <Title>
                     Admin <GreenText>panel</GreenText>
                  </Title>
                  <AdminPanelControls>
                     <SearchInput
                        onChange={handleSearchStringChange}
                        placeholder="Search..."
                     />
                     <PublishNewsButton onClick={handlePublishNews}>
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
               </>
            )}
            {publishNews && login && isAdmin && (
               <>
                  <Title>
                     Publish <GreenText>news</GreenText>
                  </Title>
                  <PublishNewsContainer>
                     <NewsTitleInput onChange={handleTitleChange} placeholder="Enter news title"></NewsTitleInput>
                     <NewsContentInput onChange={handleContentChange} placeholder="Enter news content"></NewsContentInput>
                     <NewsImageInput onChange={handleImageChange} placeholder="Add a link to a cover photo"></NewsImageInput>
                  </PublishNewsContainer>
                  <SubmitButton onClick={handleClickSubmit} type="submit">Publish</SubmitButton>
               </>
            )}
            {(!login || !isAdmin) && (
               <Title>
                  Only <GreenText>admins</GreenText> can use this
               </Title>
            )}
         </AdminPanelContainer>
      </AdminPanelWrapper>
   );
};

export default AdminPanel;
