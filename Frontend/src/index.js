import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from "./components/App/App.tsx";
import './components/globals.ts';

import MainPage from "./components/pages/MainPage/MainPage.tsx";
import AdminPanel from "./components/pages/AdminPanel/AdminPanel.tsx";
import OpenedNews from "./components/pages/OpenedNews/OpenedNews.tsx";
import PublishNews from "./components/pages/PublishNews/PublishNews.tsx";
import EditNews from "./components/pages/EditNews/EditNews.tsx";
import EditCategories from "./components/pages/EditCategories/EditCategories.tsx";
import OpenedCategory from "./components/OpenedCategory/OpenedCategory.tsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
          <Route path="/News/:newsId" element={<OpenedNews />} />
          <Route path="/AdminPanel/PublishNews" element={<PublishNews />} />
          <Route path="/AdminPanel/EditNews" element={<EditNews />} />
          <Route path="/AdminPanel/EditCategories" element={<EditCategories />} />
          <Route path="/Category/:categoryName" element={<OpenedCategory />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
