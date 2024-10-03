import React, { useState } from 'react';
import {
   PolicyModalCloseButton,
   Title,
   GreenText,
   PolicyText,
   PolicyModalHeader,
   PolicyModalFooter,
   ConfirmButton,
   ConfirmLabel,
   CheckBox
} from './PolicyModal.styled.ts';

import { LeftArrowIcon, CheckedIcon } from '../../elements/Icons/Icons.tsx';

import { Modal } from 'react-bootstrap';

const PolicyModal = ({ show, handleClose, onConfirm }) => {
   const [isChecked, setIsChecked] = useState<boolean>(false);

   const handleCheckBoxClick = () => {
      setIsChecked(!isChecked);
   };

   return (
      <Modal show={show} onHide={handleClose} centered style={{ left: '-9px' }} size="lg" backdrop="static">
         <Modal.Body>
            <PolicyModalHeader>
               <PolicyModalCloseButton onClick={handleClose}>
                  <LeftArrowIcon />
               </PolicyModalCloseButton>
               <Title>Privacy <GreenText>policy</GreenText></Title>
            </PolicyModalHeader>
            <PolicyText>Privacy Policy for VivoOlio <br />Effective Date: Jule 31, 2024 <br />This Privacy Policy explains how VivoOlio ApS collects, uses, and shares your personal information when you use our Services. If you have any questions or comments about this Privacy Policy, please contact us at privacy@vivoolio.com. About Us VivoOlio ApS is an international online platform that provides a space for registered users to purchase, rate, and review olive oil products and share this information with the community. This policy covers all interactions on our website, (url site ) and our mobile application, collectively referred to as the "Platform". <br />Changes to This Policy We may update this Privacy Policy occasionally. You will receive adequate notice before any new policies take effect. <br />Data Controller VivoOlio ApS, расположение , is the data controller responsible for processing personal data. We comply with the European General Data Protection Regulation (GDPR). <br />Data Collection and Use We collect personal data to enhance your experience, manage our user relationship, support and improve the platform, and fulfill our contractual obligations. The types of data we collect include: <br />Registration Data: Email, password, username, name, country of origin, and preferred language. If you register, we collect the information authorized by you. <br />Interaction Data: Information related to your activities on the Platform, such as ratings, purchases, and interactions with other users. <br />Technical Data: Data about how you access our services, which can include IP addresses, browser type, and device information.</PolicyText>
            <PolicyModalFooter>
               <ConfirmLabel>
                  <CheckBox style = { isChecked ? { backgroundColor: '#73843D' } : { backgroundColor: 'white' } } onClick={handleCheckBoxClick} ><CheckedIcon></CheckedIcon></CheckBox>
                  I agree with the privacy policy
               </ConfirmLabel>
               <ConfirmButton disabled={!isChecked} onClick={() => { onConfirm(); handleClose(); }}>
                  Next
               </ConfirmButton>
            </PolicyModalFooter>
         </Modal.Body>
      </Modal>
   );
};

export default PolicyModal;
