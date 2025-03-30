import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Platform, ImageBackground } from 'react-native';
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
  const backgroundImage = isDarkMode 
    ? require('../assets/images/bg2.png')  
    : require('../assets/images/bg1.png'); 

  
  const toggleButtonColor = isDarkMode 
    ? 'rgba(0, 0, 0, 0.87)' 
    : 'rgba(30, 94, 191, 0.81)'; 

  
  const buttonBackgroundColor = isDarkMode ? '#000' : 'rgb(30, 94, 191)'; 

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.backgroundImage}>
      <SafeAreaView 
        style={[
          globalStyles.container, 
          { paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight }
        ]}
      >
        
        <TouchableOpacity 
          onPress={toggleTheme} 
          style={{
            position: 'absolute',
            top: 40,
            right: 20,
            backgroundColor: toggleButtonColor, 
            borderRadius: 30, 
            padding: 10, 
          }}
        >
          <Ionicons 
            name={isDarkMode ? 'sunny' : 'moon'} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>

       
        <Image 
          source={require('../assets/images/jobFinder.gif')} 
          style={globalStyles.gif} 
          resizeMode="contain"
        />
        
        <Text style={[globalStyles.title, isDarkMode && globalStyles.darkText]}>
          Career Hunt
        </Text>

        <TouchableOpacity 
          style={[
            globalStyles.button, 
            { backgroundColor: buttonBackgroundColor } 
          ]} 
          onPress={() => navigation.navigate('JobFinderPage')}
        >
          <Text style={globalStyles.buttonText}>
            Get Started
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WelcomePage;
