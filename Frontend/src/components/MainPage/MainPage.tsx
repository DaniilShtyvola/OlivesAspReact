import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import { MainPageWrapper, OpenedNewsContainer, SmallNewsTitle, OpenedNewsRightSide, NewsFeedCardsContainer, OpenedNews, HeaderContainer, NewsRightSide, TodayNewsCardsContainer, Header, SelectLanguage, LanguageOption, OlioLogo, LoginButton, News, NewsContainer, NewsTitle, GreenText, Footer, FooterContainer, AppsColumn, PolicyColumn, ContactsColumn, FooterLink, BottomFooterText, AppButton, DownloadText, AppIcon } from './MainPage.styled.ts';

import AppStoreIcon from '../../icons/AppStoreIcon.tsx';
import GooglePlayIcon from '../../icons/GooglePlayIcon.tsx';
import PlanetIcon from '../../icons/PlanetIcon.tsx';
import UserIcon from '../../icons/UserIcon.tsx';

import Card from '../Card/Card.tsx';
import BigCard from '../BigCard/BigCard.tsx';
import OpenedCard from '../OpenedCard/OpenedCard.tsx';
import MediumCard from '../MediumCard/MediumCard.tsx';

import newsData from '../news.json';

interface MainPageProps { }

interface NewsItem {
   id: number;
   title: string;
   image: string;
   content: string;
   publisher: string;
   publisherIcon: string;
   publishDate: string;
}

const MainPage: FC<MainPageProps> = () => {
   const [bigCardData, setBigCardData] = useState<NewsItem | null>(null);
   const [todayNews, setTodayNews] = useState<NewsItem[]>([]);
   const [newsFeed, setNewsFeed] = useState<NewsItem[]>([]);

   const [openedNews, setOpenedNews] = useState<NewsItem | null>(null);

   const [currentLanguage, setCurrentLanguage] = useState<string>('EN');

   useEffect(() => {
      const fetchNews = async () => {
         try {
            const items = newsData as NewsItem[];

            /*const response = await axios.get<NewsItem[]>('../news.json', {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            const items = response.data;*/

            const bigCard = items.length > 0 ? items[0] : null;
            const todayNewsCards = items.slice(1, 4);
            const newsFeedCards = items.slice(4);

            setBigCardData(bigCard);
            setTodayNews(todayNewsCards);
            setNewsFeed(newsFeedCards);
         } catch (error) {
            console.error('Error fetching news data:', error);
         }
      };

      fetchNews();
   }, []);

   const handleCardClick = (newsItem: NewsItem) => {
      setOpenedNews(newsItem);
   };

   const handleLanguageChange = (language: string) => {
      setCurrentLanguage(language);
   };

   const handleLogoClick = () => {
      setOpenedNews(null);
   };

   return (
      <MainPageWrapper>
         <Header>
            <HeaderContainer>
               <SelectLanguage>
                  <PlanetIcon />
                  <LanguageOption
                     onClick={() => handleLanguageChange('EN')}
                     style={{
                        color: currentLanguage === 'EN' ? '#73843D' : 'black',
                         borderBottom: currentLanguage === 'EN' ? '2px #73843D solid' : '2px white solid'
                     }}
                  >
                     EN
                  </LanguageOption>

                  <LanguageOption
                     onClick={() => handleLanguageChange('УК')}
                     style={{
                        color: currentLanguage === 'УК' ? '#73843D' : 'black',
                        borderBottom: currentLanguage === 'УК' ? '2px #73843D solid' : '2px white solid'
                     }}
                  >
                     УК
                  </LanguageOption>
               </SelectLanguage>
               <OlioLogo onClick={handleLogoClick} style={{ userSelect: "none", cursor: "pointer" }}>vivoolio.today</OlioLogo>
               <UserIcon />
            </HeaderContainer>
         </Header>
         {openedNews ? (
            <OpenedNews>
               <OpenedNewsContainer>
                  <OpenedCard
                     news={openedNews}
                  />
                  <OpenedNewsRightSide>
                     <SmallNewsTitle>Other <GreenText>news</GreenText></SmallNewsTitle>
                     {todayNews.map(item => (
                        <MediumCard
                           key={item.id}
                           news={item}
                           onClick={() => handleCardClick(item)}
                        />
                     ))}
                  </OpenedNewsRightSide>
               </OpenedNewsContainer>
            </OpenedNews>
         ) : (
            <>
               <News>
                  <NewsContainer>
                     <NewsTitle>Today in the <GreenText>news</GreenText></NewsTitle>
                     <TodayNewsCardsContainer>
                        {bigCardData && (
                           <BigCard
                              news={bigCardData}
                              onClick={() => handleCardClick(bigCardData)}
                           />
                        )}
                        <NewsRightSide>
                           {todayNews.map(item => (
                              <Card
                                 key={item.id}
                                 news={item}
                                 onClick={() => handleCardClick(item)}
                              />
                           ))}
                        </NewsRightSide>
                     </TodayNewsCardsContainer>
                     <NewsTitle>News <GreenText>feed</GreenText></NewsTitle>
                     <NewsFeedCardsContainer>
                        {newsFeed.map(item => (
                           <Card
                              key={item.id}
                              news={item}
                              onClick={() => handleCardClick(item)}
                           />
                        ))}
                     </NewsFeedCardsContainer>
                  </NewsContainer>
               </News>
            </>
         )}
         <Footer>
            <FooterContainer>
               <ContactsColumn>
                  <OlioLogo>Vivo<GreenText>Olio</GreenText></OlioLogo>
                  <FooterLink>{currentLanguage === 'EN' ? 'About us' : 'Про нас'}</FooterLink>
                  <FooterLink>{currentLanguage === 'EN' ? 'Contacts' : 'Контакти'}</FooterLink>
                  <FooterLink>{currentLanguage === 'EN' ? 'News blog' : 'Блог новин'}</FooterLink>
               </ContactsColumn>
               <PolicyColumn>
                  <FooterLink>{currentLanguage === 'EN' ? 'Term of sale' : 'Умови продажу'}</FooterLink>
                  <FooterLink>{currentLanguage === 'EN' ? 'Privacy policy' : 'Політика конфіденційності'}</FooterLink>
                  <FooterLink>{currentLanguage === 'EN' ? 'Term of use' : 'Термін використання'}</FooterLink>
                  <FooterLink>{currentLanguage === 'EN' ? 'Current policy' : 'Поточна політика'}</FooterLink>
                  <BottomFooterText>@VivoOlio 2024<br />{currentLanguage === 'EN' ? 'All rights reserved' : 'Усі права захищені'}</BottomFooterText>
               </PolicyColumn>
               <AppsColumn>
                  <AppButton>
                     <DownloadText>{currentLanguage === 'EN' ? 'Download' : 'Завантажити в'}</DownloadText>
                     <AppIcon><GooglePlayIcon /></AppIcon>
                  </AppButton>
                  <AppButton>
                     <DownloadText>{currentLanguage === 'EN' ? 'Download' : 'Завантажити в'}</DownloadText>
                     <AppIcon><AppStoreIcon /></AppIcon>
                  </AppButton>
               </AppsColumn>
            </FooterContainer>
         </Footer>
      </MainPageWrapper>
   );
};

export default MainPage;