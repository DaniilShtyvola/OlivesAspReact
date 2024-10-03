import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
   PublishNewsWrapper,
   NewsTitleInput,
   NewsContentInput,
   Title,
   GreenText,
   NewsImageInput,
   PublishNewsContainer,
   SubmitButton,
   InputsContainer,
   NewsImage,
   MainContainer
} from './PublishNews.styled.ts';

import { apiUrl } from '../../config.ts';

import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PublishNewsProps { }

interface Category {
   id: number;
   name: string;
}

const PublishNews: FC<PublishNewsProps> = () => {
   const navigate = useNavigate();
   const [categories, setCategories] = useState<Category[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [image, setImage] = useState("");
   const [imageError, setImageError] = useState(true);

   const [isAdmin, setIsAdmin] = useState(false);

   const [language, setLanguage] = useState(window.pageLanguage || "EN");

   const checkImageExists = (url) => {
      return new Promise((resolve) => {
         const img = new Image();
         img.src = url;
         img.onload = () => resolve(true);
         img.onerror = () => resolve(false);
      });
   };

   useEffect(() => {
      const handleLanguageUpdate = (event: any) => {
         setLanguage(window.pageLanguage);
      };

      window.addEventListener("languageChange", handleLanguageUpdate);
   }, []);

   useEffect(() => {
      if (window.loggedInAsAdmin) {
         setIsAdmin(true);
      }
   }, []);

   const handleClickSubmit = async (e) => {
      console.log(`${title} ${content} ${image} ${selectedCategory?.id}`)
      try {
         const token = localStorage.getItem('token');
         
         var d = await axios.post(`${apiUrl}/api/news/add`, {
            Title: title,
            Content: content,
            Icon: image,
            Publisher: 'Адмін',
            PublisherIcon: 'https://kor.ill.in.ua/m/610x385/4137201.jpg',
            CategoryId: selectedCategory?.id
         }, {
            headers: {
               "X-Key": `${token}`
            }
         });


         navigate(`/News/${d.data.id}`)
      } catch (error) {
         console.error("Error adding news:", error);
      }
   };

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const categoryResponse = await axios.get(`${apiUrl}/api/category`)
            const categoryItems = categoryResponse.data as Category[];
            setCategories(categoryItems);
         } catch (error) {
            console.error('Error fetching category data:', error);
         }
      };

      fetchCategories();
   }, []);

   const handleTitleChange = (e) => {
      setTitle(e.target.value);
   };

   const handleContentChange = (e) => {
      setContent(e.target.value);
   };

   const handleImageChange = async (e) => {
      setImage(e.target.value);

      const imageExists = await checkImageExists(e.target.value);
      setImageError(!imageExists);
   };

   const handleSelect = (category: Category) => {
      setSelectedCategory(category);
   };

   return (
      <PublishNewsWrapper>
         <PublishNewsContainer>
            {isAdmin && (
               <>
                  <Title>
                     {language == "EN" ? "Publish" : "Опублікувати"} <GreenText>{language == "EN" ? "news" : "новину"}</GreenText>
                  </Title>
                  <MainContainer>
                     <div>
                        <InputsContainer>
                           <NewsTitleInput onChange={handleTitleChange} placeholder={language == "EN" ? "Enter news title" : "Введіть назву новини"}></NewsTitleInput>
                           <NewsContentInput onChange={handleContentChange} placeholder={language == "EN" ? "Enter news content" : "Введіть вміст новини"}></NewsContentInput>
                        </InputsContainer>
                     </div>
                     <div style={{marginLeft: "32px"}}>
                        <NewsImage 
                           style={{
                              backgroundImage: `url(${!imageError ? image : require('../../elements/Icons/DefaultImage.png')})`,
                              backgroundSize: !imageError ? 'cover' : 'auto',
                              backgroundPosition: imageError ? 'center' : 'initial',
                              border: `${imageError ? "1px" : "0"} solid #959595`
                           }}
                        />
                        <NewsImageInput onChange={handleImageChange} placeholder={language == "EN" ? "Add a link to a cover photo" : "Додайте посилання на фото"}></NewsImageInput>
                        <MainContainer style={{ alignItems: "center", marginTop: "12px" }}>
                           <Dropdown >
                              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: '#73843D', border: 'none' }}>
                                 {selectedCategory ? selectedCategory.name : language == "EN" ? 'Select category' : 'Оберіть категорію'}
                              </Dropdown.Toggle>
                              <Dropdown.Menu style={{marginTop: "12px"}}>
                                 {categories.map((category) => (
                                    <Dropdown.Item key={category.id} onClick={() => handleSelect(category)}>
                                       {category.name}
                                    </Dropdown.Item>
                                 ))}
                              </Dropdown.Menu>
                           </Dropdown>
                           <SubmitButton onClick={handleClickSubmit} type="submit">{language == "EN" ? "Publish" : "Опублікувати"}</SubmitButton>
                        </MainContainer>
                     </div>
                  </MainContainer>
               </>
            )}
            {(!isAdmin) && (
               <Title>
                  {language == "EN" ? "Only" : "тільки"} <GreenText>{language == "EN" ? "admins" : "адміни"}</GreenText> {language == "EN" ? "can use this" : "можуть це використовувати"}
               </Title>
            )}
         </PublishNewsContainer>
      </PublishNewsWrapper>
   );
};

export default PublishNews;
