import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRouter from "./PrivateRouter.js";

import LoginPage from "../../pages/loginPage/LoginPage.js";
import RegistrationPage from "../../pages/registrationPage/RegistrationPage.js";
import Posts from "../Posts/posts/Posts.js";
import Language from "../../pages/languagesPage/language.js";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRouter />}>
        <Route path="/" index element={<Navigate to="/languages" />} />
        <Route path="/languages" element={<Language />} />
        <Route path="/languages/:languageId/posts" element={<Posts />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
}
