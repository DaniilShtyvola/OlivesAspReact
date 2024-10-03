import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
   PageHeaderWrapper,
   SelectLanguage,
   LanguageOption,
   HeaderContainer,
   HeaderIconsContainer,
   OlioLogo
} from './PageHeader.styled.ts';

import { UserIcon, PlanetIcon } from '../Icons/Icons.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

import LoginModal from '../../modals/LoginModal/LoginModal.tsx';

import { apiUrl } from '../../config.ts';

interface PageHeaderProps { }

const PageHeader: FC<PageHeaderProps> = () => {
   const navigate = useNavigate();

   const [showLoginModal, setShowLoginModal] = useState(false);
   const [language, setLanguage] = useState(window.pageLanguage || "EN");

   const [adminButton, setAdminButton] = useState(true);

   const checkAdm = async () => {
      var token = localStorage.getItem('token');
      try {
         var res = await axios.get(`${apiUrl}/api/auth/me`,{
            headers: {
               "X-Key": `${token}`
            }
         });

         if (res.data.isAdmin) {
            window.loggedInAsAdmin = true;
         }
      } catch {}
      
   };

   useEffect(() => {
      const handleAdminIconUpdate = (event: any) => {
         setAdminButton(window.loggedInAsAdmin);
      };

      window.addEventListener("adminLoggedIn", handleAdminIconUpdate);

      try {
         checkAdm();
      } catch {}
      
   }, []);

   const handleCloseLogin = () => setShowLoginModal(false);

   const handleLanguageChange = (language: string) => {
      window.pageLanguage = language;

      const event = new CustomEvent('languageChange');
      window.dispatchEvent(event);

      setLanguage(window.pageLanguage);
   };

   const handleShowLogin = () => setShowLoginModal(true);

   const goToAdminPanel = () => {
      navigate('/AdminPanel');
   };

   const goToMainPage = () => {
      navigate('/');
   }; 

   return (
      <PageHeaderWrapper>
         <HeaderContainer>
            <SelectLanguage>
               <PlanetIcon />
               <LanguageOption
                  onClick={() => handleLanguageChange('EN')}
                  style={{
                     color: language === 'EN' ? '#73843D' : 'black',
                     borderBottom: language === 'EN' ? '2px #73843D solid' : '2px white solid'
                  }}
               >
                  EN
               </LanguageOption>
               <LanguageOption
                  onClick={() => handleLanguageChange('УК')}
                  style={{
                     color: language === 'УК' ? '#73843D' : 'black',
                     borderBottom: language === 'УК' ? '2px #73843D solid' : '2px white solid'
                  }}
               >
                  УК
               </LanguageOption>
            </SelectLanguage>
            <OlioLogo onClick={goToMainPage} style={{ userSelect: "none", cursor: "pointer" }}>vivoolio.today</OlioLogo>
            <HeaderIconsContainer>
               { adminButton && (
                  <FontAwesomeIcon onClick={goToAdminPanel} style={{ color: "#73843D", fontSize: "160%", marginRight: "18px" }} icon={faScrewdriverWrench} />
               )}
               <UserIcon onClick={handleShowLogin} />
            </HeaderIconsContainer>
         </HeaderContainer>
         <LoginModal show={showLoginModal} handleClose={handleCloseLogin} />
      </PageHeaderWrapper>
   );
};

export default PageHeader;
