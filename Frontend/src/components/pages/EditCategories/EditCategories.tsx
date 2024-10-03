import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
   EditCategoriesWrapper,
   EditCategoriesContainer,
   Title,
   GreenText,
   EditCategoriesControls,
   SearchInput,
   AdminPanelButton,
   CategoryContainer,
   CategoryName,
   CategoryButtons,
   CategoryInformation,
   EditCategoriesHints,
   CategoriesHint,
   ButtonsHint,
   CategoryInput,
   AddCategoryContainer
} from './EditCategories.styled.ts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSquareCheck, faSquareXmark, faBars, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';

import { apiUrl } from '../../config.ts';

interface EditCategoriesProps { }

interface CategoryItem {
   id: number;
   name: string;
}

const EditCategories: FC<EditCategoriesProps> = () => {
   const navigate = useNavigate();

   const [searchString, setSearchString] = useState('');
   const [categories, setCategories] = useState<CategoryItem[]>([]);
   const [editedCategory, setEditedCategory] = useState<{ id: number; name: string } | null>(null);

   const [addCategory, setAddCategory] = useState(false);
   const [newCategoryName, setNewCategoryName] = useState('');

   const [isAdmin, setIsAdmin] = useState(false);

   const [language, setLanguage] = useState(window.pageLanguage || "EN");

   useEffect(() => {
      const handleLanguageUpdate = (event: any) => {
         setLanguage(window.pageLanguage);
      };

      window.addEventListener("languageChange", handleLanguageUpdate);
   }, []);

   useEffect(() => {
      const fetchNews = async () => {
         try {
            if (window.loggedInAsAdmin) {
               setIsAdmin(true);

               const response = await axios.get(`${apiUrl}/api/news`)
               const items = response.data as CategoryItem[];

               setCategories(items);
            }
         } catch (error) {
            console.error('Error fetching categories data:', error);
         }
      };

      fetchNews();
   }, []);

   const handleSearchStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchString(e.target.value);
   };

   const handleDeleteCategory = async (id: number) => {
      try {
         const token = localStorage.getItem('token');
         await axios.delete(`${apiUrl}/api/news/${id}`, {
            headers: {
               "X-Key": `${token}`
            }
         });
         setCategories(categories.filter((categoryItem) => categoryItem.id !== id));
      } catch (error) {
         console.error("Error deleting news:", error);
      }
   };

   const handleEditClick = (categoryItem) => {
      if (editedCategory?.id === categoryItem.id) {
         setEditedCategory(null);
      } else {

         setEditedCategory({ id: categoryItem.id, name: categoryItem.name });
      }
   };

   const handleSubmitEdit = (categoryItem) => {
      // Add put
   };

   const handleAddCategory = () => {
      setAddCategory(!addCategory);
   };

   const goToAdminPanel = () => {
      navigate('/AdminPanel');
   };

   const filteredCategories = categories.filter((categoryItem) =>
      categoryItem.name.toLowerCase().includes(searchString.toLowerCase())
   );

   return (
      <EditCategoriesWrapper>
         <EditCategoriesContainer>
            {isAdmin && (
               <>
                  <Title>
                     {language == "EN" ? "Edit" : "Редагувати"} <GreenText>{language == "EN" ? "categories" : "категорії"}</GreenText>
                  </Title>
                  <EditCategoriesControls>
                     <SearchInput
                        onChange={handleSearchStringChange}
                        placeholder={language == "EN" ? "Search..." : "Шукати..."}
                     />
                     <EditCategoriesControls>
                        {!addCategory && (
                           <AdminPanelButton onClick={handleAddCategory}>
                              <FontAwesomeIcon
                                 style={{
                                    fontSize: '120%',
                                    color: '#73843D',
                                    cursor: 'pointer',
                                    margin: '2px 6px 0 0'
                                 }}
                                 icon={faPlus}
                              />
                              {language == "EN" ? "Add category" : "Додати категорію"}
                           </AdminPanelButton>
                        )}
                        <AdminPanelButton onClick={goToAdminPanel}>
                           <FontAwesomeIcon
                              style={{
                                 fontSize: '120%',
                                 color: '#73843D',
                                 cursor: 'pointer',
                                 margin: '2px 6px 0 48px'
                              }}
                              icon={faBars}
                           />
                           {language == "EN" ? "Edit news" : "Редагувати новини"}
                        </AdminPanelButton>
                     </EditCategoriesControls>
                  </EditCategoriesControls>
                  <EditCategoriesHints>
                     <EditCategoriesHints>
                        <CategoriesHint>{language == "EN" ? "Categories" : "Категорії"}</CategoriesHint>
                     </EditCategoriesHints>
                     <ButtonsHint style={language === "УК" ? { marginRight: "22px" } : undefined}>{language == "EN" ? "Tools" : "Інструменти"}</ButtonsHint>
                  </EditCategoriesHints>

                  {addCategory && (
                     <AddCategoryContainer>
                        <FontAwesomeIcon
                           style={{
                              fontSize: '180%',
                              color: '#73843D',
                              margin: '12px 16px 0 0'
                           }}
                           icon={faPlus}
                        />
                        <CategoryContainer style={{ flex: 1 }}>
                           <CategoryInput
                              style={{ height: "33.3px" }}
                              value={newCategoryName}
                              onChange={(e) => setNewCategoryName(e.target.value)}
                           />
                           <CategoryButtons>
                              <FontAwesomeIcon
                                 style={{
                                    fontSize: '120%',
                                    color: '#73843D',
                                    cursor: 'pointer',
                                    marginLeft: '22px'
                                 }}
                                 icon={faSquareCheck}
                              //onClick={() => }
                              />
                              <FontAwesomeIcon
                                 style={{
                                    fontSize: '120%',
                                    color: '#73843D',
                                    cursor: 'pointer',
                                    marginLeft: '22px'
                                 }}
                                 icon={faSquareXmark}
                                 onClick={handleAddCategory}
                              />
                           </CategoryButtons>
                        </CategoryContainer>
                     </AddCategoryContainer>
                  )}

                  {filteredCategories.map((categoryItem) => (
                     <CategoryContainer key={categoryItem.id}>
                        <CategoryInformation>
                           {editedCategory?.id === categoryItem.id ? (
                              <CategoryInput
                                 value={editedCategory.name}
                                 onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
                              />
                           ) : (
                              <CategoryName>{categoryItem.name}</CategoryName>
                           )}
                        </CategoryInformation>
                        <CategoryButtons>
                           {editedCategory?.id === categoryItem.id ? (
                              <>
                                 <FontAwesomeIcon
                                    style={{
                                       fontSize: '120%',
                                       color: '#73843D',
                                       cursor: 'pointer',
                                       marginLeft: '22px'
                                    }}
                                    icon={faSquareCheck}
                                    onClick={() => handleSubmitEdit(categoryItem.id)}
                                 />
                                 <FontAwesomeIcon
                                    style={{
                                       fontSize: '120%',
                                       color: '#73843D',
                                       cursor: 'pointer',
                                       marginLeft: '22px'
                                    }}
                                    icon={faSquareXmark}
                                    onClick={() => handleEditClick(categoryItem)}
                                 />
                              </>
                           ) : (
                              <FontAwesomeIcon
                                 style={{
                                    fontSize: '120%',
                                    color: '#73843D',
                                    cursor: 'pointer',
                                 }}
                                 onClick={() => handleEditClick(categoryItem)}
                                 icon={faPencil}
                              />
                           )}
                           <FontAwesomeIcon
                              style={{
                                 fontSize: '120%',
                                 color: '#73843D',
                                 cursor: 'pointer',
                                 marginLeft: '22px'
                              }}
                              icon={faTrash}
                              onClick={() => handleDeleteCategory(categoryItem.id)}
                           />
                        </CategoryButtons>
                     </CategoryContainer>
                  ))}
               </>
            )}
            {(!isAdmin) && (
               <Title>
                  {language == "EN" ? "Only" : "тільки"} <GreenText>{language == "EN" ? "admins" : "адміни"}</GreenText> {language == "EN" ? "can use this" : "можуть це використовувати"}
               </Title>
            )}
         </EditCategoriesContainer>
      </EditCategoriesWrapper >
   );
};

export default EditCategories;
