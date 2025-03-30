import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/ThemeContext';
import WelcomePage from './src/welcomePage';
import JobFinderPage from './src/jobFinderPage';
import ApplyJobScreen from './src/ApplyJob';
import { RootStackParamList } from './src/navigationTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from './src/type';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [saved, applied] = await Promise.all([
          AsyncStorage.getItem('persistedSavedJobs'),
          AsyncStorage.getItem('appliedJobs')
        ]);
        
        if (saved) setSavedJobs(JSON.parse(saved));
        if (applied) setAppliedJobs(JSON.parse(applied));
      } catch (error) {
        Alert.alert('Error', 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const saveJob = async (job: Job): Promise<void> => {
    if (!savedJobs.some(saved => saved.id === job.id)) {
      const newSavedJobs = [...savedJobs, job];
      setSavedJobs(newSavedJobs);
      await AsyncStorage.setItem('persistedSavedJobs', JSON.stringify(newSavedJobs));
    }
  };

  const removeSavedJob = async (jobId: string): Promise<void> => {
    const newSavedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(newSavedJobs);
    await AsyncStorage.setItem('persistedSavedJobs', JSON.stringify(newSavedJobs));
  };

  const applyJob = async (jobId: string): Promise<void> => {
    try {
      if (!appliedJobs.includes(jobId)) {
        const newAppliedJobs = [...appliedJobs, jobId];
        setAppliedJobs(newAppliedJobs);
        await AsyncStorage.setItem('appliedJobs', JSON.stringify(newAppliedJobs));
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    navigationRef.current?.navigate('Welcome');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator 
          initialRouteName="JobFinderPage"
          screenOptions={{ 
            headerShown: false,
            gestureEnabled: false
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="JobFinderPage">
            {() => (
              <JobFinderPage 
                savedJobs={savedJobs}
                appliedJobs={appliedJobs}
                onSaveJob={saveJob}
                onRemoveJob={removeSavedJob}
                onApplyJob={applyJob}
                onLogout={handleLogout}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="ApplyJob">
            {(props) => (
              <ApplyJobScreen 
                {...props}
                onApplyJob={applyJob}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;