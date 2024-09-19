import React, { useState, useEffect } from 'react';
import {
   LoginModalCloseContainer,
   LoginModalCloseButton,
   OlioFullLogo,
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

import { AppleIcon, GoogleIcon, CloseIcon } from '../Icons/Icons.tsx';

import PolicyModal from '../PolicyModal/PolicyModal.tsx';

import { Modal } from 'react-bootstrap';

const LoginModal = ({ show, handleClose }) => {
   const [showPolicyModal, setShowPolicyModal] = useState(false);
   const [showForm, setShowForm] = useState("Authorization");

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

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

   const handleClickSubmit = (e) => {
      if (showForm == "Authorization") {
         handleShowForm("Enter your password");
      }
      else if (showForm == "Sign up") {
         handleShowForm("Create password");
      }
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
            <OlioFullLogo style={{ backgroundImage: `url("https://yt3.googleusercontent.com/F4SqXRlQHbCoPrr29Cg_zvSNXlCxjVbN2jsP5qFlc1olTmNsfZlqViQ5FE_6yO8sIY2kcRtc6_o=s160-c-k-c0x00ffffff-no-rj")` }} />
            <LoginModalTitle>{showForm}</LoginModalTitle>
            {showForm === "Authorization" || showForm === "Sign up" ? (
               <LoginModalEmailInput onChange={handleEmailChange} type="email" placeholder="Enter your email" required />
            ) : null}
            {showForm === "Enter your password" ? (
               <LoginModalPasswordInput onChange={handlePasswordChange} type="password" placeholder="Your password" required />
            ) : null}
            {showForm === "Create password" ? (
               <>
                  <LoginModalPasswordInput onChange={handlePasswordChange} type="password" placeholder="Enter your password" required />
                  <LoginModalPasswordInputConfirm onChange={handleConfirmPasswordChange} type="password" placeholder="Confirm your password" required />
               </>
            ) : null}
            <LoginModalSubmitButton onClick={handleClickSubmit} type="submit">Next</LoginModalSubmitButton>
            {showForm === "Authorization" || showForm === "Sign up" ? (
               <>
                  <LoginModalDivider>
                     <LoginModalDividerLine />
                     Or
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
            ) : null}
            <LoginModalRegisterFooter>No account yet? <LoginModalRegisterButton onClick={handleShowPolicy} >Sign up</LoginModalRegisterButton></LoginModalRegisterFooter>
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
