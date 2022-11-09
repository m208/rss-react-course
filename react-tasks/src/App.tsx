import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage } from 'components/MainPage/MainPage';
import About from 'components/About/About';
import Page404 from 'components/Page404/Page404';
import Header from 'components/Header/Header';
import { FormsPage } from 'components/FormsPage/FormsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header currentPage="Main Page" />
              <MainPage />
            </>
          }
        />
        <Route
          path="/forms"
          element={
            <>
              <Header currentPage="Forms Page" />
              <FormsPage />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header currentPage="About Page" />
              <About />
            </>
          }
        />
        <Route
          path="/404"
          element={
            <>
              <Header currentPage="404 Page" />
              <Page404 />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
