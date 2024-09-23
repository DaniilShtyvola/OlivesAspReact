import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import {
   MainPageWrapper,
   OpenedNewsContainer,
   SmallNewsTitle,
   OpenedNewsRightSide,
   NewsFeedCardsContainer,
   OpenedNews,
   HeaderContainer,
   NewsRightSide,
   TodayNewsCardsContainer,
   Header,
   SelectLanguage,
   LanguageOption,
   OlioLogo,
   News,
   NewsContainer,
   NewsTitle,
   GreenText,
   Footer,
   FooterContainer,
   AppsColumn,
   PolicyColumn,
   ContactsColumn,
   FooterLink,
   BottomFooterText,
   AppButton,
   DownloadText,
   AppIcon,
   HeaderIconsContainer
} from './MainPage.styled.ts';

import { AppStoreIcon, GooglePlayIcon, UserIcon, PlanetIcon } from '../Icons/Icons.tsx';
import { OpenedCard, BigCard, MediumCard, DefaultCard } from '../Cards/Cards.tsx';
import LoginModal from '../LoginModal/LoginModal.tsx';
import AdminPanel from '../AdminPanel/AdminPanel.tsx';

import { apiUrl } from '../config.ts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css';

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
   const [adminPanel, setAdminPanel] = useState(false);

   const [currentLanguage, setCurrentLanguage] = useState<string>('EN');
   const [showLoginModal, setShowLoginModal] = useState(false);

   useEffect(() => {
      const fetchNews = async () => {
         try {
            const response = await axios.get(`${apiUrl}/api/news`)

            const items = response.data as NewsItem[];

            //const items = newsData as NewsItem[];

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
      setAdminPanel(false);
   };

   const handleAdminPanel = () => {
      setAdminPanel(true);
   };

   const handleShowLogin = () => setShowLoginModal(true);

   const handleCloseLogin = () => setShowLoginModal(false);

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
               <HeaderIconsContainer>
                  <FontAwesomeIcon onClick={handleAdminPanel} style={{ color: "#73843D", fontSize: "160%", marginRight: "18px"}} icon={faScrewdriverWrench} />
                  <UserIcon onClick={handleShowLogin}/>
               </HeaderIconsContainer>
            </HeaderContainer>
         </Header>
         {openedNews && !adminPanel ? (
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
         ) : null }
         {!openedNews && !adminPanel ? (
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
                              <DefaultCard
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
                           <DefaultCard
                              key={item.id}
                              news={item}
                              onClick={() => handleCardClick(item)}
                           />
                        ))}
                     </NewsFeedCardsContainer>
                  </NewsContainer>
               </News>
            </>
         ) : null}
         {adminPanel ? (
            <AdminPanel/>
         ) : null}
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
         <LoginModal show={showLoginModal} handleClose={handleCloseLogin} />
      </MainPageWrapper>
   );
};

export default MainPage;