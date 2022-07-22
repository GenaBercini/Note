import React from 'react';
import { AuthUserProvider, Navigation } from './src/navigation/Navigation';

export default function App() {

  return (
    <AuthUserProvider>
      <Navigation />
    </AuthUserProvider>
  );
}