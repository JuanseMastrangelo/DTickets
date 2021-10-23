import React, { createContext, useState } from 'react';
import { Main } from './views/Main';
import { NavBar } from './components/navBar/index';
import { Route, Switch } from 'react-router-dom';

export const AppContext = createContext(null);


export const Routes = () => {
  const [appState, setAppState] = useState(null);

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </AppContext.Provider>
  );
};