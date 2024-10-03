import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируйте useNavigate
import {
   DefaultCardWrapper, 
   DefaultNewsPicture, 
   DefaultInfoContainer, 
   DefaultTitle, 
   DefaultBottomInfo, 
   DefaultPublisher, 
   DefaultPublisherName, 
   DefaultPublisherIcon, 
   DefaultNewsTime, 
   DefaultNewsDate,

   MediumCardWrapper, 
   MediumNewsPicture, 
   MediumInfoContainer, 
   MediumTitle, 
   MediumBottomInfo, 
   MediumPublisher, 
   MediumPublisherName, 
   MediumPublisherIcon, 
   MediumNewsTime, 
   MediumNewsDate,

   OpenedCardWrapper, 
   OpenedNewsPicture, 
   OpenedNewsContent, 
   OpenedTitle, 
   OpenedBottomInfo, 
   OpenedPublisher, 
   OpenedPublisherName, 
   OpenedPublisherIcon, 
   OpenedNewsTime, 
   OpenedNewsDate,

   BigCardWrapper, 
   BigNewsPicture, 
   BigInfoContainer, 
   BigTitle, 
   BigBottomInfo, 
   BigPublisher, 
   BigPublisherName, 
   BigPublisherIcon, 
   BigNewsTime, 
   BigNewsDate,
   NewsTag
} from './Cards.styled.ts';

interface News {
   id: number;
   title: string;
   icon: string;
   content: string;
   publisher: string;
   publisherIcon: string;
   publishDate: string;
   categoryName?: string;
   category: number;
}

interface CardProps {
   news: News;
   variant?: 'default' | 'big' | 'medium' | 'opened';
}

const Card: FC<CardProps> = ({ news, variant = 'default' }) => {
   const navigate = useNavigate();

   const handleClick = () => {
      //window.openedNews = news;
      
      //const event = new CustomEvent('openedNewsChange');
      //window.dispatchEvent(event);

      navigate(`/News/${news.id}`);
   };

   const formattedDate = new Date(news.publishDate).toLocaleDateString();
   const formattedTime = new Date(news.publishDate).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
   });

   switch (variant) {
      case 'big':
         return (
            <BigCardWrapper onClick={handleClick}>
               <BigNewsPicture style={{ backgroundImage: `url(${news.icon})` }} />
               <BigInfoContainer>
                  <BigTitle>{news.title}</BigTitle>
                  <BigBottomInfo>
                     <BigPublisher>
                        <BigPublisherIcon style={{ backgroundImage: `url(${news.publisherIcon})` }} />
                        <BigPublisherName>{news.publisher}</BigPublisherName>
                        <BigNewsTime>{formattedTime}</BigNewsTime>
                     </BigPublisher>
                     <BigNewsDate>{formattedDate}</BigNewsDate>
                  </BigBottomInfo>
               </BigInfoContainer>
            </BigCardWrapper>
         );
      case 'medium':
         return (
            <MediumCardWrapper onClick={handleClick}>
               <MediumNewsPicture style={{ backgroundImage: `url(${news.icon})` }} />
               <MediumInfoContainer>
                  <MediumTitle>{news.title}</MediumTitle>
                  <MediumBottomInfo>
                     <MediumPublisher>
                        <MediumPublisherIcon style={{ backgroundImage: `url(${news.publisherIcon})` }} />
                        <MediumPublisherName>{news.publisher}</MediumPublisherName>
                        <MediumNewsTime>{formattedTime}</MediumNewsTime>
                     </MediumPublisher>
                     <MediumNewsDate>{formattedDate}</MediumNewsDate>
                  </MediumBottomInfo>
               </MediumInfoContainer>
            </MediumCardWrapper>
         );
      case 'opened':
         return (
            <OpenedCardWrapper>
               <OpenedTitle>{news.title}</OpenedTitle>
               <NewsTag>{news.categoryName}</NewsTag>
               <OpenedBottomInfo>
                  <OpenedPublisher>
                     <OpenedPublisherIcon style={{ backgroundImage: `url(${news.publisherIcon})` }} />
                     <OpenedPublisherName>{news.publisher}</OpenedPublisherName>
                     <OpenedNewsTime>{formattedTime}</OpenedNewsTime>
                     <OpenedNewsDate>{formattedDate}</OpenedNewsDate>
                  </OpenedPublisher>
               </OpenedBottomInfo>
               <OpenedNewsPicture style={{ backgroundImage: `url(${news.icon})` }} />
               <OpenedNewsContent>{news.content}</OpenedNewsContent>
            </OpenedCardWrapper>
         );
      default:
         return (
            <DefaultCardWrapper onClick={handleClick}>
               <DefaultNewsPicture style={{ backgroundImage: `url(${news.icon})` }} />
               <DefaultInfoContainer>
                  <DefaultTitle>{news.title}</DefaultTitle>
                  <DefaultBottomInfo>
                     <DefaultPublisher>
                        <DefaultPublisherIcon style={{ backgroundImage: `url(${news.publisherIcon})` }} />
                        <DefaultPublisherName>{news.publisher}</DefaultPublisherName>
                        <DefaultNewsTime>{formattedTime}</DefaultNewsTime>
                     </DefaultPublisher>
                     <DefaultNewsDate>{formattedDate}</DefaultNewsDate>
                  </DefaultBottomInfo>
               </DefaultInfoContainer>
            </DefaultCardWrapper>
         );
   }
};

export const OpenedCard = (props: Omit<CardProps, 'variant'>) => <Card {...props} variant="opened" />;
export const BigCard = (props: Omit<CardProps, 'variant'>) => <Card {...props} variant="big" />;
export const MediumCard = (props: Omit<CardProps, 'variant'>) => <Card {...props} variant="medium" />;
export const DefaultCard = (props: Omit<CardProps, 'variant'>) => <Card {...props} variant="default" />;
