import { Appearance } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ThemeProvider} from '../context/ThemeContext'

import { Colors } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions = {{  headerStyle : { backgroundColor: theme.headerBackground}, headerTintColor: theme.text, headerShadowVisible: false }}
        >
          {/* <Stack.Screen name = "(evil)" options = {{ headerShown: false }}/> */}

          <Stack.Screen name = 'index' options = {{ headerShown:false, title: 'Home'}}/>
          <Stack.Screen name = 'contact' options = {{ headerShown:true, title: 'Contact', headerTitle: 'Contact Us'}}/>
          <Stack.Screen name = 'menu' options = {{ headerShown:true, title: 'Menu', headerTitle: 'Antique Menu Shop'}}/>
          <Stack.Screen name = 'menus' options = {{ headerShown:false, title: 'Menus', headerTitle: 'Add Religion Antique'}}/>

          <Stack.Screen name ='menusRoute/[id]' />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
