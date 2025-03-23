import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/ThemeContext'; // Import ThemeProvider
import WelcomePage from './src/welcomePage';
import JobFinderPage from './src/jobFinderPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider> 
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="JobFinderPage" component={JobFinderPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
