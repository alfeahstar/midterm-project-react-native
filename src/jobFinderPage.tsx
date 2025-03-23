import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { jobFinderStyles } from './styles/jobFinderStyle';
import { globalStyles } from './styles/globalStyles';
import SavedJobsPage from './savedJobs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const Tab = createBottomTabNavigator();

const JobFinderScreen = () => {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView style={[{ flex: 1, paddingBottom: insets.bottom }, isDarkMode && globalStyles.darkContainer]}>
      <View style={jobFinderStyles.container}>
        <Text style={[jobFinderStyles.title, isDarkMode && globalStyles.darkText]}>
          Job Finder Page
        </Text>
      </View>
    </SafeAreaView>
  );
};

// **Back Button Component**
const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  );
};

// **Dark Mode Toggle Button**
const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
      <Ionicons name={isDarkMode ? 'sunny' : 'moon'} size={24} color="white" />
    </TouchableOpacity>
  );
};

const JobFinderPage = () => {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, size = 24 }) => {
          // **Explicitly cast icon name to Ionicons available icons**
          let iconName: keyof typeof Ionicons.glyphMap =
            route.name === 'JobFinder' ? 'briefcase' : 'bookmark';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: isDarkMode ? '#4DA8DA' : 'rgb(4, 92, 186)',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#222' : '#fff',
          height: 70,
          paddingBottom: insets.bottom > 0 ? insets.bottom - 5 : 10,
        },
        headerStyle: { backgroundColor: isDarkMode ? '#222' : 'rgb(4, 92, 186)' },
        headerTintColor: 'white',
        headerLeft: () => (navigation.canGoBack() ? <BackButton /> : null), // Show only if navigable
        headerRight: () => <DarkModeToggle />,
      })}
    >
      <Tab.Screen name="JobFinder" component={JobFinderScreen} />
      <Tab.Screen name="Saved Jobs" component={SavedJobsPage} />
    </Tab.Navigator>
  );
};

export default JobFinderPage;
