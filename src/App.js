import { Routes, Route } from 'react-router-dom';

import { Header } from './components/header';
import { Main } from './components/main';

import { HomePage } from './pages/home';
import {QuestionPage} from "./pages/question";
import {ExpertPage} from "./pages/expert";
import {NotFoundPage} from "./pages/not-found";
import {useEffect, useState} from "react";
import {getAllQuestions} from "./api";

function App() {
    return (
      <>
        <Header />
        <Main>
          <Routes>
            <Route exact path="/" element={
                <HomePage/>
            } />
            <Route path="/questions/:id" element={<QuestionPage />} />
            <Route path="/expert" element={<ExpertPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Main>
      </>
  );
}

export default App;