import { Navigate, Route, Routes } from 'react-router-dom';

import AuthPage from '../../pages/authPage/AuthPage.js';
import Posts from '../posts/Posts.js';
import Language from '../../pages/languagesPage/language.js';

import PrivateRouter from './PrivateRouter.js';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRouter />}>
        <Route path="/" index element={<Navigate to="/languages" />} />
        <Route path="/languages" element={<Language />} />
        <Route path="/languages/:languageId/posts" element={<Posts />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
    </Routes>
  );
}
