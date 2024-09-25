import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { FirebaseProvider } from '@components/firebase/firebase';
import { Home } from '@pages/home';

import './styles/theme.scss';

export const App: React.FC = () => (
  <FirebaseProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </FirebaseProvider>
);
