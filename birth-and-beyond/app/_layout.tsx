import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '@/src/store'; 

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Birth & Beyond' }} />
        <Stack.Screen name="baby" options={{ title: 'Baby Details' }} />
      </Stack>
    </Provider>
  );
}
