import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import ArticlePage from "../../pages/ArticlePage";
import "./App.scss";
import Layout from "./Layout";
import RequireAuth from "../hoc/RequireAuth";
import SignUpPage from "../../pages/SignUpPage";
import SignInPage from "../../pages/SignInPage";
import EditProfilePage from "../../pages/EditProfilePage";
import CreateArticlePage from "../../pages/CreateArticlePage";
import EditArticlePage from "../../pages/EditArticlePage";
import NotFoundPage from "../../pages/NorFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="articles" element={<HomePage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route
            path="profile"
            element={(
              <RequireAuth>
                <EditProfilePage />
              </RequireAuth>
            )}
          />
          <Route
            path="new-article"
            element={(
              <RequireAuth>
                <CreateArticlePage />
              </RequireAuth>
            )}
          />
          <Route
            path="articles/:slug/edit"
            element={(
              <RequireAuth>
                <EditArticlePage />
              </RequireAuth>
            )}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
