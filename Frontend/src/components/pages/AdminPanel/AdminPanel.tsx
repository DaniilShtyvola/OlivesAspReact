import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
   NewsContent,
   AdminPanelHints,
   NewsHint,
   ButtonsHint,
   DateHint
} from './AdminPanel.styled.ts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBars, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';

import { apiUrl } from '../../config.ts';

interface AdminPanelProps { }

interface NewsItem {
   id: number;
   title: string;
   image: string;
   content: string;
   publisher: string;
   publisherIcon: string;
   publishDate: string;
   category: number;
}

const AdminPanel: FC<AdminPanelProps> = () => {
   const navigate = useNavigate();

   const [searchString, setSearchString] = useState('');
   const [news, setNews] = useState<NewsItem[]>([]);

   const [isAdmin, setIsAdmin] = useState(false);

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
            if (window.loggedInAsAdmin) {
               setIsAdmin(true);

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

   const handleEditNews = async (news: NewsItem) => {
      window.editNews = news;
      navigate('/AdminPanel/EditNews');
   };

   const goToPublishNews = () => {
      navigate('/AdminPanel/PublishNews');
   };

   const goToEditCategories = () => {
      navigate('/AdminPanel/EditCategories');
   };

   const filteredNews = news.filter((newsItem) =>
      newsItem.title.toLowerCase().includes(searchString.toLowerCase())
   );

   return (
      <AdminPanelWrapper>
         <AdminPanelContainer>
            {isAdmin && (
               <>
                  <Title>
                     {language == "EN" ? "Admin" : "Адмін"} <GreenText>{language == "EN" ? "panel" : "панель"}</GreenText>
                  </Title>
                  <AdminPanelControls>
                     <SearchInput
                        onChange={handleSearchStringChange}
                        placeholder={language == "EN" ? "Search..." : "Шукати..."}
                     />
                     <AdminPanelControls>
                        <PublishNewsButton onClick={goToPublishNews}>
                           <FontAwesomeIcon
                              style={{
                                 fontSize: '120%',
                                 color: '#73843D',
                                 cursor: 'pointer',
                                 margin: '2px 6px 0 0'
                              }}
                              icon={faPlus}
                           />
                           {language == "EN" ? "Publish news" : "Опубліковати новину"}
                        </PublishNewsButton>
                        <PublishNewsButton onClick={goToEditCategories}>
                           <FontAwesomeIcon
                              style={{
                                 fontSize: '120%',
                                 color: '#73843D',
                                 cursor: 'pointer',
                                 margin: '2px 6px 0 48px'
                              }}
                              icon={faBars}
                           />
                           {language == "EN" ? "Edit categories" : "Редагувати категорії"}
                        </PublishNewsButton>
                     </AdminPanelControls>
                  </AdminPanelControls>
                  <AdminPanelHints>
                     <AdminPanelHints>
                        <NewsHint>{language == "EN" ? "News" : "Новини"}</NewsHint>
                        <DateHint style={language === "УК" ? { marginLeft: "332px" } : undefined}>{language == "EN" ? "Date" : "Дата"}</DateHint>
                     </AdminPanelHints>
                     <ButtonsHint style={language === "УК" ? { marginRight: "22px" } : undefined}>{language == "EN" ? "Tools" : "Інструменти"}</ButtonsHint>
                  </AdminPanelHints>

                  {filteredNews.map((newsItem) => (
                     <NewsContainer key={newsItem.id}>
                        <NewsInformation>
                           <NewsImage src={newsItem.image} alt={newsItem.title} />
                           <div>
                              <NewsTitle>{newsItem.title}</NewsTitle>
                              <NewsContent>{newsItem.content}</NewsContent>
                           </div>
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
                                 margin: '2px 6px 0 0'
                              }}
                              onClick={() => handleEditNews(newsItem)}
                              icon={faPencil}
                           />
                           <FontAwesomeIcon
                              style={{
                                 fontSize: '120%',
                                 color: '#73843D',
                                 cursor: 'pointer',
                                 marginLeft: '18px'
                              }}
                              icon={faTrash}
                              onClick={() => handleDeleteNews(newsItem.id)}
                           />
                        </NewsButtons>
                     </NewsContainer>
                  ))}
               </>
            )}
            {(!isAdmin) && (
               <Title>
                  {language == "EN" ? "Only" : "тільки"} <GreenText>{language == "EN" ? "admins" : "адміни"}</GreenText> {language == "EN" ? "can use this" : "можуть це використовувати"}
               </Title>
            )}
         </AdminPanelContainer>
      </AdminPanelWrapper>
   );
};

export default AdminPanel;
