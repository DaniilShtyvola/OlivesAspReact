import React, { FC } from 'react';
import { MainCardWrapper, NewsPicture, NewsContent, Title, BottomInfo, Publisher, PublisherName, PublisherIcon, NewsTime, NewsDate } from './OpenedCard.styled.ts';

interface News {
   id: number;
   title: string;
   image: string;
   content: string;
   publisher: string;
   publisherIcon: string;
   publishDate: string;
}

interface MainCardProps {
   news: News;
   onClick?: () => void;
}

const MainCard: FC<MainCardProps> = ({ news }) => {
   const formattedDate = new Date(news.publishDate).toLocaleDateString();
   const formattedTime = new Date(news.publishDate).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
   });

   return (
      <MainCardWrapper>
         <Title>{news.title}</Title>
         <BottomInfo>
               <Publisher>
                  <PublisherIcon style={{ backgroundImage: `url(${news.publisherIcon})` }} />
                  <PublisherName>{news.publisher}</PublisherName>
                  <NewsTime>{formattedTime}</NewsTime>
                  <NewsDate>{formattedDate}</NewsDate>
               </Publisher>
            </BottomInfo>
         <NewsPicture style={{ backgroundImage: `url(${news.image})` }} />
         <NewsContent>{news.content}</NewsContent>
      </MainCardWrapper>
   );
};

export default MainCard;
