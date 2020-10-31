import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MoviesPage from '../pages/movies';
import ActorPage from '../pages/actors';

export default function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={MoviesPage} />
      <Route exact path="/actors" component={ActorPage} />
    </BrowserRouter>
  );
}
