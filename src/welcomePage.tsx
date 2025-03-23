import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Platform } from 'react-native';
import { globalStyles } from './styles/globalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';
import { useTheme } from './ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type WelcomePageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
};

const WelcomePage: React.FC<WelcomePageProps> = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <SafeAreaView 
      style={[
        globalStyles.container, 
        isDarkMode && globalStyles.darkContainer, 
        { paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight }
      ]}
    >
      {/* Dark Mode Toggle */}
      <TouchableOpacity onPress={toggleTheme} style={globalStyles.toggleButton}>
        <Ionicons 
          name={isDarkMode ? 'sunny' : 'moon'} 
          size={24} 
          color="white" 
        />
      </TouchableOpacity>

      {/* Add GIF Image */}
      <Image 
        source={require('../assets/images/jobFinder.gif')} 
        style={globalStyles.gif} 
        resizeMode="contain"
      />
      
      <Text style={[globalStyles.title, isDarkMode && globalStyles.darkText]}>
        Welcome to Job Finder
      </Text>

      <TouchableOpacity 
        style={globalStyles.button} 
        onPress={() => navigation.navigate('JobFinderPage')}
      >
        <Text style={globalStyles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomePage;
