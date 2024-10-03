import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
   EditNewsWrapper,
   NewsTitleInput,
   NewsContentInput,
   Title,
   GreenText,
   NewsImageInput,
   EditNewsContainer,
   SubmitButton,
   InputsContainer,
   NewsImage,
   MainContainer
} from './EditNews.styled.ts';

import { apiUrl } from '../../config.ts';

import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface NewsItem {
   id: number;
   title: string;
   icon: string;
   content: string;
   publisher: string;
   publisherIcon: string;
   publishDate: string;
   category: number;
}

interface Category {
   id: number;
   name: string;
}

interface EditNewsProps { }

const EditNews: FC<EditNewsProps> = () => {
   const navigate = useNavigate();
   const [news, setNews] = useState<NewsItem>();
   const [categories, setCategories] = useState<Category[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [image, setImage] = useState("");
   const [imageError, setImageError] = useState(false);

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

   useEffect(() => {
      if (window.editNews) {
         const currentNews = window.editNews;
         setNews(currentNews);
         setTitle(currentNews.title);
         setContent(currentNews.content);
         setImage(currentNews.icon);
      }

      const fetchCategories = async () => {
         try {
            const categoryResponse = await axios.get(`${apiUrl}/api/category`)
            const categoryItems = categoryResponse.data as Category[];
            setCategories(categoryItems);

            if (categoryResponse.data.length > 0) {
               setSelectedCategory(categoryResponse.data[0]);
            }
         } catch (error) {
            console.error('Error fetching category data:', error);
         }
      };

      fetchCategories();
   }, []);

   useEffect(() => {
      if (categories.length > 0) {
         const currentNews = window.editNews;
         const category = categories.find(cat => cat.id === currentNews.category);
         setSelectedCategory(category || null);
      }
   }, [categories]);

   const handleClickSubmit = async (e) => {
      const token = localStorage.getItem('token');

      const currentNews = window.editNews;

      await axios.put(`${apiUrl}/api/news/${currentNews.id}`, {
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

      navigate(`/News/${currentNews.id}`);
      
   };

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
      <EditNewsWrapper>
         <EditNewsContainer>
            {isAdmin && news && (
               <>
                  <Title>
                     {language == "EN" ? "Edit" : "Редагувати"} <GreenText>{language == "EN" ? "news" : "новину"}</GreenText>
                  </Title>
                  <MainContainer>
                     <div>
                        <InputsContainer>
                           <NewsTitleInput onChange={handleTitleChange} defaultValue={news.title} placeholder={language == "EN" ? "Enter news title" : "Введіть назву новини"}></NewsTitleInput>
                           <NewsContentInput onChange={handleContentChange} defaultValue={news.content} placeholder={language == "EN" ? "Enter news content" : "Введіть вміст новини"}></NewsContentInput>
                        </InputsContainer>
                     </div>
                     <div style={{ marginLeft: "32px" }}>
                        <NewsImage
                           style={{
                              backgroundImage: `url(${!imageError ? image : require('../../elements/Icons/DefaultImage.png')})`,
                              backgroundSize: !imageError ? 'cover' : 'auto',
                              backgroundPosition: imageError ? 'center' : 'initial',
                              border: `${imageError ? "1px" : "0"} solid #959595`
                           }}
                        />
                        <NewsImageInput onChange={handleImageChange} defaultValue={news.icon} placeholder={language == "EN" ? "Add a link to a cover photo" : "Додайте посилання на фото"}></NewsImageInput>
                        <MainContainer style={{ alignItems: "center", marginTop: "12px" }}>
                           <Dropdown >
                              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: '#73843D', border: 'none' }}>
                                 {selectedCategory ? selectedCategory.name : 'Выберите категорию'}
                              </Dropdown.Toggle>
                              <Dropdown.Menu style={{marginTop: "12px"}}>
                                 {categories.map((category) => (
                                    <Dropdown.Item key={category.id} onClick={() => handleSelect(category)}>
                                       {category.name}
                                    </Dropdown.Item>
                                 ))}
                              </Dropdown.Menu>
                           </Dropdown>
                           <SubmitButton onClick={handleClickSubmit} type="submit">{language == "EN" ? "Save" : "Зберегти"}</SubmitButton>
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
            {(!news) && (
               <Title>
                  {language == "EN" ? "No" : "Не обрано"} <GreenText>{language == "EN" ? "news" : "новину"}</GreenText> {language == "EN" ? "selected" : ""}
               </Title>
            )}
         </EditNewsContainer>
      </EditNewsWrapper>
   );
};

export default EditNews;
