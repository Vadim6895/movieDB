import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from './pages/main/main';
import Films from './pages/films/films';
import Film from './pages/film/film';
import NotFound from './pages/notfound/notfound';
import Person from './pages/person/person';
import Layout from './components/layout/layout';
import { appRoute } from './const';
import ScrollToTop from './components/scrollToTop/scrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path={appRoute.MAIN} element={<Layout />}>
          <Route index element={<Main />} />
          <Route path={appRoute.FILMS} element={<Films type="movie" />} />
          <Route path={appRoute.SERIALS} element={<Films type="tv-series" />} />
          <Route path={appRoute.CARTOON} element={<Films type="cartoon" />} />
          <Route
            path={appRoute.ANIMATED_SERIES}
            element={<Films type="animated-series" />}
          />
          <Route path={appRoute.FILM} element={<Film />} />
          <Route path={appRoute.PERSON} element={<Person />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
