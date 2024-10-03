import React, { FC, useEffect, useState } from 'react';
import {
   PageFooterWrapper,
   FooterContainer,
   AppsColumn,
   PolicyColumn,
   ContactsColumn,
   FooterLink,
   BottomFooterText,
   AppButton,
   DownloadText,
   AppIcon,
   OlioLogo,
   GreenText
} from './PageFooter.styled.ts';

import { AppStoreIcon, GooglePlayIcon } from '../Icons/Icons.tsx';

interface PageFooterProps { }

const PageFooter: FC<PageFooterProps> = () => {
   const [language, setLanguage] = useState(window.pageLanguage || "EN");

   useEffect(() => {
      const handleLanguageUpdate = (event: any) => {
         setLanguage(window.pageLanguage);
      };

      window.addEventListener("languageChange", handleLanguageUpdate);
   }, []);

   return (
      <PageFooterWrapper>
         <FooterContainer>
            <ContactsColumn>
               <OlioLogo>Vivo<GreenText>Olio</GreenText></OlioLogo>
               <FooterLink>{language === 'EN' ? 'About us' : 'Про нас'}</FooterLink>
               <FooterLink>{language === 'EN' ? 'Contacts' : 'Контакти'}</FooterLink>
               <FooterLink>{language === 'EN' ? 'News blog' : 'Блог новин'}</FooterLink>
            </ContactsColumn>
            <PolicyColumn>
               <FooterLink>{language === 'EN' ? 'Term of sale' : 'Умови продажу'}</FooterLink>
               <FooterLink>{language === 'EN' ? 'Privacy policy' : 'Політика конфіденційності'}</FooterLink>
               <FooterLink>{language === 'EN' ? 'Term of use' : 'Термін використання'}</FooterLink>
               <FooterLink>{language === 'EN' ? 'Current policy' : 'Поточна політика'}</FooterLink>
               <BottomFooterText>@VivoOlio 2024<br />{language === 'EN' ? 'All rights reserved' : 'Усі права захищені'}</BottomFooterText>
            </PolicyColumn>
            <AppsColumn>
               <AppButton>
                  <DownloadText>{language === 'EN' ? 'Download' : 'Завантажити в'}</DownloadText>
                  <AppIcon><GooglePlayIcon /></AppIcon>
               </AppButton>
               <AppButton>
                  <DownloadText>{language === 'EN' ? 'Download' : 'Завантажити в'}</DownloadText>
                  <AppIcon><AppStoreIcon /></AppIcon>
               </AppButton>
            </AppsColumn>
         </FooterContainer>
      </PageFooterWrapper>
   );
};

export default PageFooter;
