import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

import './App.scss';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Loader from './components/Loader/Loader';

const ShowPage = React.lazy(() => import('./pages/ShowPage/ShowPage'));
const EpisodePage = React.lazy(() => import('./pages/EpisodePage/EpisodePage'));
const FavoritesPage = React.lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const PersonPage = React.lazy(() => import('./pages/PersonPage/PersonPage'));
const ListingPage = React.lazy(() => import('./pages/ListingPage/ListingPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // I dati sono considerati "freschi" per 5 minuti
      gcTime: 1000 * 60 * 30, // Mantieni in cache per 30 minuti prima del Garbage Collection
      refetchOnWindowFocus: false, // Evita chiamate inutili quando l'utente cambia tab (ottimo per le performance!)
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div className='app'>
          <Router>
            <AuthProvider>
              <Header />
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route path='/' exact component={HomePage} />
                  <Route path='/about' exact component={AboutPage} />
                  <Route path='/login' exact component={Login} />
                  <Route path='/register' exact component={Register} />
                  <Route
                    exact
                    path='/signin'
                    render={() => <Redirect to='/login' />}
                  />
                  <Route
                    exact
                    path='/signup'
                    render={() => <Redirect to='/register' />}
                  />
                  <Route
                    path='/list/:section/:id?/:category/'
                    exact
                    component={ListingPage}
                  />
                  <PrivateRoute path='/favorites'>
                    <FavoritesPage />
                  </PrivateRoute>
                  {/* <Route path="/favorites" exact component={FavoritesPage} /> */}
                  <Route path='/show/:id' exact component={ShowPage} />
                  <Route path='/episode/:id' exact component={EpisodePage} />
                  <Route path='/person/:id' exact component={PersonPage} />
                </Switch>
              </Suspense>
              <Footer />
            </AuthProvider>
          </Router>
          <ToastContainer />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
