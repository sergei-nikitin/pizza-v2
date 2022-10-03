import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import MainLayout from './layouts/MainLayout';
import { Home } from './pages/Home';

import './scss/app.scss';
/* @ts-ignore */
const Cart = Loadable({
  loader: () => import('./pages/Cart').then(m => m.Cart,
),
  loading: () => <p>loading ...</p>,
});

const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
/* @ts-ignore */
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
.then((m) => ({
    default: m.NotFound,
  })));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={
          <Suspense fallback={<p>loading ...</p>}>
          <Cart />
        </Suspense>} />
        <Route path="/pizza/:id" element={
            <Suspense fallback={<p>loading ...</p>}>
          <FullPizza />
        </Suspense>} 
         />
        <Route path="*" element={  <Suspense fallback={<p>loading ...</p>}>
          <NotFound />
        </Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
