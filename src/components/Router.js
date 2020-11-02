import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MoviesPage from '../pages/movies';
import ActorPage from '../pages/actors';
import NotFound from '../pages/NotFound';

//Control de rutas de la web
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MoviesPage} />
        <Route exact path="/actors" component={ActorPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
