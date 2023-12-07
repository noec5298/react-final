import React, { createContext} from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';

import PostCreate from '../../pages/post/create';
import Blog from '../../pages/blog';
import PostView from '../../pages/post/view';

export const GradesContext = createContext();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/blog" element={<MainLayout />} >
          <Route index element={<Blog />} />
        </Route>
        <Route path="/post" element={<MainLayout />} >
          <Route path=":id" element={<PostView />} />
          <Route path="create" element={<PostCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;