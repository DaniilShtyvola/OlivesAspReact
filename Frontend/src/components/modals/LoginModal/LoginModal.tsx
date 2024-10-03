import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
   LoginModalCloseContainer,
   LoginModalCloseButton,
   LoginModalTitle,
   LoginModalEmailInput,
   LoginModalSubmitButton,
   LoginModalDivider,
   LoginModalDividerLine,
   LoginModalAppIcons,
   LoginModalAppIcon,
   LoginModalRegisterFooter,
   LoginModalRegisterButton,
   LoginModalPasswordInput,
   LoginModalPasswordInputConfirm
} from './LoginModal.styled.ts';

import { AppleIcon, GoogleIcon, CloseIcon, VivoOlioLogo } from '../../elements/Icons/Icons.tsx';

import PolicyModal from '../PolicyModal/PolicyModal.tsx';

import { Modal, Alert } from 'react-bootstrap';
import { apiUrl } from '../../config.ts';

const LoginModal = ({ show, handleClose }) => {
   const [showPolicyModal, setShowPolicyModal] = useState(false);
   const [showForm, setShowForm] = useState("Authorization");

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const [message, setMessage] = useState<{ text: string, variant: string } | null>(null);
   const [isFadingOut, setIsFadingOut] = useState(false);

   const [language, setLanguage] = useState(window.pageLanguage || "EN");

   const handleShowPolicy = () => setShowPolicyModal(true);
   const handleClosePolicy = () => setShowPolicyModal(false);

   const handleShowForm = (formType) => {
      setShowForm(formType);
   };

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
   };

   const handlePasswordChange = (e) => {
      setPassword(e.target.value);
   };

   const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
   };

   function isEmailValid(email: string): boolean {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
   }

   const handleClickSubmit = (e) => {
      if (!isEmailValid(email)) {
         setMessage({ text: "Invalid email.", variant: "danger" });
         return;
      }

      if (showForm == "Authorization") {
         handleShowForm("Enter your password");
      }
      else if (showForm == "Sign up") {
         handleShowForm("Create password");
      } else if (showForm === "Create password") {
         handleRegister();
      } else {
         handleLogin();
      }
   };

   const handleLogin = async () => {
      try {
         const loginPayload = {
            Username: email.substring(0, email.indexOf('@')),
            Password: password
         };

         const response = await axios.post(`${apiUrl}/api/auth/login`, loginPayload);
         localStorage.setItem("token", response.data.token);

         setEmail("");
         setPassword("");

         setMessage({ text: "Login successful!", variant: "success" });

         const isAdminResponse = await axios.get(`${apiUrl}/api/auth/me`, {
            headers: {
               "X-Key": localStorage.getItem("token") || ""
            }
         });

         if (isAdminResponse.data.isAdmin) {
            window.loggedInAsAdmin = true;

            const event = new CustomEvent('adminLoggedIn');
            window.dispatchEvent(event);
         }
      } catch (error) {
         console.error(error);
         setMessage({ text: "Login failed! The nickname or password is incorrect.", variant: "danger" });
      }
   };

   const handleRegister = async () => {
      if (!password || !confirmPassword) {
         setMessage({ text: "Write the password.", variant: "danger" });
         return;
      }
      if (password !== confirmPassword) {
         setMessage({ text: "Passwords do not match.", variant: "danger" });
         return;
      }

      const loginPayload = { Username: email.substring(0, email.indexOf('@')), Password: password };

      console.log(loginPayload);
      axios.post(`${apiUrl}/api/auth/login`, loginPayload)
         .then((response) => {
            if (response.status === 200) {
               setMessage({ text: "Registration successful!", variant: "success" });
               setEmail("");
               setPassword("");
               setConfirmPassword("");
            } else {
               setMessage({ text: "Registration failed. Please try again.", variant: "danger" });
            }
         })
         .catch((e) => {
            setMessage({ text: "An error occurred. Please try again.", variant: "danger" });
            console.error(e);
         });
   };

   useEffect(() => {
      if (!show) {
         const timer = setTimeout(() => {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setShowForm("Authorization");
         }, 1000);

         return () => clearTimeout(timer);
      }
   }, [show]);

   useEffect(() => {
      const handleLanguageUpdate = (event: any) => {
         setLanguage(window.pageLanguage);
      };

      window.addEventListener("languageChange", handleLanguageUpdate);
   }, []);

   useEffect(() => {
      if (message) {
         const fadeOutTimer = setTimeout(() => {
            setIsFadingOut(true);
         }, 3000);

         const removeMessageTimer = setTimeout(() => {
            setMessage(null);
            setIsFadingOut(false);
         }, 4000);

         return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(removeMessageTimer);
         };
      }
   }, [message]);

   function topModalText(): string {
      if (window.pageLanguage == "EN")
         return showForm;

      if (showForm == "Authorization") {
         return "Авторизація";
      } else if (showForm == "Enter your password") {
         return "Введіть ваш пароль";
      } else if (showForm == "Create password") {
         return "Створіть пароль";
      } 
      return "Реєстрація";
   }

   return (
      <Modal show={show} onHide={handleClose} centered>
         <Modal.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 36px 0 36px" }}>
            <LoginModalCloseContainer>
               <div></div>
               <LoginModalCloseButton>
                  <div onClick={handleClose} style={{ position: "absolute", top: "44px", right: "32px", cursor: "pointer" }}>
                     <CloseIcon />
                  </div>
               </LoginModalCloseButton>
            </LoginModalCloseContainer>
            <VivoOlioLogo />
            <LoginModalTitle>{topModalText()}</LoginModalTitle>
            {(showForm === "Authorization" || showForm === "Sign up") && (
               <LoginModalEmailInput onChange={handleEmailChange} type="email" placeholder={language == "EN" ? "Enter your email" : "Введіть пошту"} required />
            )}
            {showForm === "Enter your password" && (
               <LoginModalPasswordInput onChange={handlePasswordChange} type="password" placeholder={language == "EN" ? "Your password" : "Ваш пароль"} required />
            )}
            {showForm === "Create password" && (
               <>
                  <LoginModalPasswordInput onChange={handlePasswordChange} type="password" placeholder={language == "EN" ? "Enter your password" : "Введіть пароль"} required />
                  <LoginModalPasswordInputConfirm onChange={handleConfirmPasswordChange} type="password" placeholder={language == "EN" ? "Confirm your password" : "Підтвердіть пароль"} required />
               </>
            )}
            <LoginModalSubmitButton onClick={handleClickSubmit} type="submit">{language == "EN" ? "Next" : "Далі"}</LoginModalSubmitButton>
            {message && (
               <Alert
                  style={{
                     opacity: isFadingOut ? 0 : 1,
                     height: isFadingOut ? 0 : "58px",
                     padding: isFadingOut ? 0 : 'auto',
                     marginBottom: 0,
                     overflow: "hidden",
                     transition: "opacity 1s ease-in-out, height 1s ease-in-out, padding 1s ease-in-out",
                  }}
                  variant={message.variant}
               >
                  {message.text}
               </Alert>
            )}
            {(showForm === "Authorization" || showForm === "Sign up") && (
               <>                  с
                  <LoginModalDivider>
                     <LoginModalDividerLine />
                     {language == "EN" ? "Or" : "Або"}
                     <LoginModalDividerLine />
                  </LoginModalDivider>
                  <LoginModalAppIcons>
                     <LoginModalAppIcon>
                        <GoogleIcon />
                     </LoginModalAppIcon>
                     <LoginModalAppIcon>
                        <AppleIcon />
                     </LoginModalAppIcon>
                  </LoginModalAppIcons>
               </>
            )}
            <LoginModalRegisterFooter>{language == "EN" ? "No account yet?" : "Немає аккаунту?"} <LoginModalRegisterButton onClick={handleShowPolicy} >{language == "EN" ? "Sign up" : "Зареєструйся"}</LoginModalRegisterButton></LoginModalRegisterFooter>
         </Modal.Body>
         <PolicyModal
            show={showPolicyModal}
            handleClose={handleClosePolicy}
            onConfirm={() => {
               handleShowForm("Sign up");
            }}
         />
      </Modal>
   );
};

export default LoginModal;
