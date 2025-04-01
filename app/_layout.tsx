import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
// import * as NavigationBar from 'expo-navigation-bar';
import GlobalContextProvider from '@/context/globalcontext';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from 'react-query';
import "../global.css";

// import { Platform } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const client = new QueryClient()

  // const visibility = NavigationBar.useVisibility()
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins_Thin: require('../assets/fonts/static/Poppins-Thin.ttf'),
    Poppins_ExtraLight: require('../assets/fonts/static/Poppins-ExtraLight.ttf'),
    Poppins_Light: require('../assets/fonts/static/Poppins-Light.ttf'),
    Poppins: require('../assets/fonts/static/Poppins-Regular.ttf'),
    Poppins_Medium: require('../assets/fonts/static/Poppins-Medium.ttf'),
    Poppins_Semibold: require('../assets/fonts/static/Poppins-SemiBold.ttf'),
    Poppins_Bold: require('../assets/fonts/static/Poppins-Bold.ttf'),
    Poppins_Extrabold: require('../assets/fonts/static/Poppins-ExtraBold.ttf'),
    Poppins_Black: require('../assets/fonts/static/Poppins-Black.ttf'),
    Oswald_Bold: require('../assets/fonts/static/Oswald-Bold.ttf'),
    ...FontAwesome.font,
  });

  // useEffect(() => {
  //   if (visibility === 'visible') {
  //     Platform.OS === "android" && NavigationBar.setBackgroundColorAsync('white')
  //     Platform.OS === "android" && NavigationBar.setBorderColorAsync('white')
  //   }
  // }, [visibility])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <QueryClientProvider client={client}>
        <GlobalContextProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name='note' />
          </Stack>
          <StatusBar style="auto" />
        </GlobalContextProvider>
      </QueryClientProvider>
    </>
  );
}
