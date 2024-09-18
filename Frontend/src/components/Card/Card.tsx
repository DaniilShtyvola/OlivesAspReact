import React, { FC } from 'react';
import { CardWrapper, NewsPicture, InfoContainer, Title, BottomInfo, Publisher, PublisherName, PublisherIcon, NewsTime, NewsDate } from './Card.styled.ts';

interface News {
   id: number;
   title: string;
   image: string;
   content: string;
   publisher: string;
   publisherIcon: string;
   publishDate: string;
}

interface CardProps {
   news: News;
}

const Card: FC<CardProps> = ({ news }) => {
   const formattedDate = new Date(news.publishDate).toLocaleDateString();
   const formattedTime = new Date(news.publishDate).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
   });

   return (
      <CardWrapper>
         <NewsPicture style={{ backgroundImage: `url(${news.image})` }} />
         <InfoContainer>
            <Title>{news.title}</Title>
            <BottomInfo>
               <Publisher>
                  <PublisherIcon style={{ backgroundImage: `url(${news.publisherIcon})` }} />
                  <PublisherName>{news.publisher}</PublisherName>
                  <NewsTime>{formattedTime}</NewsTime>
               </Publisher>
               <NewsDate>{formattedDate}</NewsDate>
            </BottomInfo>
         </InfoContainer>
      </CardWrapper>
   );
};
export default Card;
