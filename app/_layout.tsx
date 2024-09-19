import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {Navigator} from "expo-router";
import Slot = Navigator.Slot;
import {SessionProvider, useSession} from "@/app/ctx";
import {createTables} from "@/services/database";
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { darkTheme } from '@/constants/Theme';
import { lightTheme } from '@/constants/Theme';
import {setStorageItemAsync, useStorageState} from './useStorageState';

// Prevent the splash screen from auto-hiding before asset loading is complete.


export default function RootLayout() {
  const themeType = useColorScheme();
    const [[isLoadingTheme, theme], setTheme] = useStorageState('theme');
    const themeJson = {
        'dark': darkTheme,
        'light': lightTheme
    }

    useEffect(() => {
      createTables();
  }, []);

  return (
    <PaperProvider theme={theme === "auto" || theme === null ? themeType === "dark" ? themeJson['dark'] : themeJson['light'] :  themeJson[theme]}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </PaperProvider>
  );
}
