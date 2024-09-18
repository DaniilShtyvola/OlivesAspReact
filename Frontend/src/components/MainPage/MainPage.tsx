import React, { FC } from 'react';
import { MainPageWrapper, NewsFeedCardsContainer, HeaderContainer, NewsRightSide, TodayNewsCardsContainer, Header, SelectLanguage, LanguageOption, OlioLogo, LoginButton, News, NewsContainer, NewsTitle, GreenText, Footer, FooterContainer, AppsColumn, PolicyColumn, ContactsColumn, FooterLink, BottomFooterText, AppButton, DownloadText, AppIcon } from './MainPage.styled.ts';

import AppStoreIcon from '../../icons/AppStoreIcon.tsx';
import GooglePlayIcon from '../../icons/GooglePlayIcon.tsx';
import PlanetIcon from '../../icons/PlanetIcon.tsx';
import UserIcon from '../../icons/UserIcon.tsx';

import Card from '../Card/Card.tsx';
import BigCard from '../BigCard/BigCard.tsx';

interface MainPageProps { }

const MainPage: FC<MainPageProps> = () => (
   <MainPageWrapper>
      <Header>
         <HeaderContainer>
            <SelectLanguage>
               <PlanetIcon></PlanetIcon>
               <LanguageOption>EN</LanguageOption>
               <LanguageOption>УК</LanguageOption>
            </SelectLanguage>
            <OlioLogo>vivoolio.today</OlioLogo>
            <UserIcon></UserIcon>
         </HeaderContainer>
      </Header>
      <News>
         <NewsContainer>
            <NewsTitle>Today in the <GreenText>news</GreenText></NewsTitle>
            <TodayNewsCardsContainer>
               <BigCard
                  news={{
                     id: 1,
                     title: 'VivoOlio: The best recipes for dishes with olives.',
                     image: 'https://foodfestival.com.ua/image/catalog/media/d30bcc648ba3dcc6ecb471e4ccd47ce3.jpg',
                     content: 'VivoOlio: The best recipes for dishes with olives.',
                     publisher: 'VivoOlio',
                     publisherIcon: 'https://yt3.googleusercontent.com/F4SqXRlQHbCoPrr29Cg_zvSNXlCxjVbN2jsP5qFlc1olTmNsfZlqViQ5FE_6yO8sIY2kcRtc6_o=s160-c-k-c0x00ffffff-no-rj',
                     publishDate: '2024-07-20T10:30:00Z',
                  }}
               />
               <NewsRightSide>
                  <Card
                     news={{
                        id: 1,
                        title: 'VivoOlio: The best recipes for dishes with olives.',
                        image: 'https://foodfestival.com.ua/image/catalog/media/d30bcc648ba3dcc6ecb471e4ccd47ce3.jpg',
                        content: 'VivoOlio: The best recipes for dishes with olives.',
                        publisher: 'VivoOlio',
                        publisherIcon: 'https://yt3.googleusercontent.com/F4SqXRlQHbCoPrr29Cg_zvSNXlCxjVbN2jsP5qFlc1olTmNsfZlqViQ5FE_6yO8sIY2kcRtc6_o=s160-c-k-c0x00ffffff-no-rj',
                        publishDate: '2024-07-20T10:30:00Z',
                     }}
                  />
                  <Card
                     news={{
                        id: 1,
                        title: 'VivoOlio: The best recipes for dishes with olives.',
                        image: 'https://foodfestival.com.ua/image/catalog/media/d30bcc648ba3dcc6ecb471e4ccd47ce3.jpg',
                        content: 'VivoOlio: The best recipes for dishes with olives.',
                        publisher: 'VivoOlio',
                        publisherIcon: 'https://yt3.googleusercontent.com/F4SqXRlQHbCoPrr29Cg_zvSNXlCxjVbN2jsP5qFlc1olTmNsfZlqViQ5FE_6yO8sIY2kcRtc6_o=s160-c-k-c0x00ffffff-no-rj',
                        publishDate: '2024-07-20T10:30:00Z',
                     }}
                  />
                  <Card
                     news={{
                        id: 1,
                        title: 'VivoOlio: The best recipes for dishes with olives.',
                        image: 'https://foodfestival.com.ua/image/catalog/media/d30bcc648ba3dcc6ecb471e4ccd47ce3.jpg',
                        content: 'VivoOlio: The best recipes for dishes with olives.',
                        publisher: 'VivoOlio',
                        publisherIcon: 'https://yt3.googleusercontent.com/F4SqXRlQHbCoPrr29Cg_zvSNXlCxjVbN2jsP5qFlc1olTmNsfZlqViQ5FE_6yO8sIY2kcRtc6_o=s160-c-k-c0x00ffffff-no-rj',
                        publishDate: '2024-07-20T10:30:00Z',
                     }}
                  />
               </NewsRightSide>
            </TodayNewsCardsContainer>
            <NewsTitle>News <GreenText>feed</GreenText></NewsTitle>
            <NewsFeedCardsContainer>
               <Card
                  news={{
                     id: 1,
                     title: 'VivoOlio: The best recipes for dishes with olives.',
                     image: 'https://foodfestival.com.ua/image/catalog/media/d30bcc648ba3dcc6ecb471e4ccd47ce3.jpg',
                     content: 'VivoOlio: The best recipes for dishes with olives.',
                     publisher: 'VivoOlio',
                     publisherIcon: 'https://yt3.googleusercontent.com/F4SqXRlQHbCoPrr29Cg_zvSNXlCxjVbN2jsP5qFlc1olTmNsfZlqViQ5FE_6yO8sIY2kcRtc6_o=s160-c-k-c0x00ffffff-no-rj',
                     publishDate: '2024-07-20T10:30:00Z',
                  }}
               />
               <Card
                  news={{
                     id: 1,
                     title: 'VivoOlio: The best recipes for dishes with olives.',
                     image: 'https://foodfestival.com.ua/image/catalog/media/d30bcc648ba3dcc6ecb471e4ccd47ce3.jpg',
                     content: 'VivoOlio: The best recipes for dishes with olives.',
                     publisher: 'VivoOlio',
                     publisherIcon: 'https://yt3.googleusercontent.com/F4SqXRlQHbCoPrr29Cg_zvSNXlCxjVbN2jsP5qFlc1olTmNsfZlqViQ5FE_6yO8sIY2kcRtc6_o=s160-c-k-c0x00ffffff-no-rj',
                     publishDate: '2024-07-20T10:30:00Z',
                  }}
               />
               <Card
                  news={{
                     id: 1,
                     title: 'VivoOlio: The best recipes for dishes with olives.',
                     image: 'https://foodfestival.com.ua/image/catalog/media/d30bcc648ba3dcc6ecb471e4ccd47ce3.jpg',
                     content: 'VivoOlio: The best recipes for dishes with olives.',
                     publisher: 'VivoOlio',
                     publisherIcon: 'https://yt3.googleusercontent.com/F4SqXRlQHbCoPrr29Cg_zvSNXlCxjVbN2jsP5qFlc1olTmNsfZlqViQ5FE_6yO8sIY2kcRtc6_o=s160-c-k-c0x00ffffff-no-rj',
                     publishDate: '2024-07-20T10:30:00Z',
                  }}
               />
               <Card
                  news={{
                     id: 1,
                     title: 'VivoOlio: The best recipes for dishes with olives.',
                     image: 'https://foodfestival.com.ua/image/catalog/media/d30bcc648ba3dcc6ecb471e4ccd47ce3.jpg',
                     content: 'VivoOlio: The best recipes for dishes with olives.',
                     publisher: 'VivoOlio',
                     publisherIcon: 'https://yt3.googleusercontent.com/F4SqXRlQHbCoPrr29Cg_zvSNXlCxjVbN2jsP5qFlc1olTmNsfZlqViQ5FE_6yO8sIY2kcRtc6_o=s160-c-k-c0x00ffffff-no-rj',
                     publishDate: '2024-07-20T10:30:00Z',
                  }}
               />
               <Card
                  news={{
                     id: 1,
                     title: 'VivoOlio: The best recipes for dishes with olives.',
                     image: 'https://foodfestival.com.ua/image/catalog/media/d30bcc648ba3dcc6ecb471e4ccd47ce3.jpg',
                     content: 'VivoOlio: The best recipes for dishes with olives.',
                     publisher: 'VivoOlio',
                     publisherIcon: 'https://yt3.googleusercontent.com/F4SqXRlQHbCoPrr29Cg_zvSNXlCxjVbN2jsP5qFlc1olTmNsfZlqViQ5FE_6yO8sIY2kcRtc6_o=s160-c-k-c0x00ffffff-no-rj',
                     publishDate: '2024-07-20T10:30:00Z',
                  }}
               />
               <Card
                  news={{
                     id: 1,
                     title: 'VivoOlio: The best recipes for dishes with olives.',
                     image: 'https://foodfestival.com.ua/image/catalog/media/d30bcc648ba3dcc6ecb471e4ccd47ce3.jpg',
                     content: 'VivoOlio: The best recipes for dishes with olives.',
                     publisher: 'VivoOlio',
                     publisherIcon: 'https://yt3.googleusercontent.com/F4SqXRlQHbCoPrr29Cg_zvSNXlCxjVbN2jsP5qFlc1olTmNsfZlqViQ5FE_6yO8sIY2kcRtc6_o=s160-c-k-c0x00ffffff-no-rj',
                     publishDate: '2024-07-20T10:30:00Z',
                  }}
               />
            </NewsFeedCardsContainer>
         </NewsContainer>
      </News>
      <Footer>
         <FooterContainer>
            <ContactsColumn>
               <OlioLogo>Vivo<GreenText>Olio</GreenText></OlioLogo>
               <FooterLink>About us</FooterLink>
               <FooterLink>Contacts</FooterLink>
               <FooterLink>News blog</FooterLink>
            </ContactsColumn>
            <PolicyColumn>
               <FooterLink>Term of sale</FooterLink>
               <FooterLink>Privacy policy</FooterLink>
               <FooterLink>Term of use</FooterLink>
               <FooterLink>Current policy</FooterLink>
               <BottomFooterText>@VivoOlio 2024<br/>Усі права захищені</BottomFooterText>
            </PolicyColumn>
            <AppsColumn>
               <AppButton>
                  <DownloadText>Завантажити в</DownloadText>
                  <AppIcon><GooglePlayIcon></GooglePlayIcon></AppIcon>
               </AppButton>
               <AppButton>
                  <DownloadText>Завантажити в</DownloadText>
                  <AppIcon><AppStoreIcon></AppStoreIcon></AppIcon>
               </AppButton>
            </AppsColumn>
         </FooterContainer>
      </Footer>
   </MainPageWrapper>
);

export default MainPage;
