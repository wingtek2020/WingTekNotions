import React from 'react';
import "react-native-gesture-handler";
import AppNavigation from './navigation/AppNavigation'
import { DataProvider } from './hooks/useData';

export default function App() {
  return (
    <DataProvider>
      <AppNavigation />
    </DataProvider>
  );
}

