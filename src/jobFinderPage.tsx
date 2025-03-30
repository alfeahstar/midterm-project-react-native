import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { jobFinderStyles } from './styles/jobFinderStyle';
import { globalStyles } from './styles/globalStyles';
import SavedJobsPage from './savedJobs';
import ApplyJobScreen from './ApplyJob';
import { useTheme } from './ThemeContext';
import { Job } from './type';
import { RootStackParamList } from './navigationTypes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const API_URL = 'https://empllo.com/api/v1';

interface JobFinderPageProps {
  savedJobs: Job[];
  appliedJobs: string[];
  onSaveJob: (job: Job) => Promise<void>;
  onRemoveJob: (jobId: string) => Promise<void>;
  onApplyJob: (jobId: string) => Promise<void>;
  onLogout: () => void;
}

interface JobFinderScreenProps {
  jobs: Job[];
  loading: boolean;
  error: string;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  onSaveJob: (job: Job) => Promise<void>;
  savedJobs: Job[];
  appliedJobs: string[];
  onApplyJob: (jobId: string) => Promise<void>;
  onLogout: () => void;
}

const JobFinderScreen: React.FC<JobFinderScreenProps> = ({ 
  jobs,
  loading,
  error,
  searchQuery,
  setSearchQuery,
  onSaveJob, 
  savedJobs,
  appliedJobs,
  onApplyJob,
  onLogout
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();
  const { isDarkMode } = useTheme();

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApplyPress = (job: Job) => {
    if (appliedJobs.includes(job.id)) return;
    navigation.navigate('ApplyJob', { 
      jobId: job.id,
      jobTitle: job.title,
      company: job.companyName, 
      routeName: 'JobFinderPage'
    });
  };

  const renderJobItem = ({ item }: { item: Job }): React.ReactElement => {
    const isApplied = appliedJobs.includes(item.id);
    const isSaved = savedJobs.some(saved => saved.id === item.id);
    
    return (
      <View style={[jobFinderStyles.jobCard, isDarkMode && jobFinderStyles.darkCard]}>
        <View style={jobFinderStyles.jobHeader}>
          <Image source={{ uri: item.companyLogo }} style={jobFinderStyles.jobLogo} />
          <TouchableOpacity 
            style={jobFinderStyles.saveIconButton}
            onPress={() => !isSaved && onSaveJob(item)}
            disabled={isSaved}
          >
            <Ionicons 
              name={isSaved ? 'bookmark' : 'bookmark-outline'} 
              size={27} 
              color={
                isSaved 
                  ? isDarkMode 
                    ? 'rgb(126, 205, 247)'  
                    : '#1F509A' 
                  : (isDarkMode ? '#fff' : '#1F509A') 
              } 
            />
          </TouchableOpacity>
        </View>
        <Text style={[jobFinderStyles.jobTitle, isDarkMode && jobFinderStyles.darkText]}>{item.title}</Text>
        <Text style={[jobFinderStyles.company, isDarkMode && jobFinderStyles.darkText]}>{item.companyName}</Text>
        <Text style={[jobFinderStyles.salary, isDarkMode && jobFinderStyles.darkText]}>
          {item.minSalary && item.maxSalary ? `$${item.minSalary} - $${item.maxSalary}` : 'Salary not disclosed'}
        </Text>

        <TouchableOpacity
          style={[jobFinderStyles.applyButton, isApplied && jobFinderStyles.appliedButton]}
          onPress={() => !isApplied && handleApplyPress(item)}
          disabled={isApplied}
        >
          <Text style={jobFinderStyles.applyButtonText}>
            {isApplied ? 'Applied ✓' : 'Apply Now'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[jobFinderStyles.loadingContainer, isDarkMode && jobFinderStyles.darkContainer]}>
        <ActivityIndicator size="large" color={isDarkMode ? '#4DA8DA' : 'rgb(4, 92, 186)'} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[jobFinderStyles.loadingContainer, isDarkMode && jobFinderStyles.darkContainer]}>
        <Text style={[jobFinderStyles.title, isDarkMode && jobFinderStyles.darkText]}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[jobFinderStyles.safeArea, isDarkMode && jobFinderStyles.darkContainer]}>
      <View style={[jobFinderStyles.container, isDarkMode && jobFinderStyles.darkContainer]}>
        <View style={[jobFinderStyles.searchContainer, isDarkMode && jobFinderStyles.darkSearchContainer]}>
          <View style={jobFinderStyles.searchInputContainer}>
            <TextInput
              style={[
                jobFinderStyles.searchBar, 
                isDarkMode && jobFinderStyles.darkTextInput,
                isDarkMode && { color: '#fff' }
              ]}
              placeholder="Search for a job..."
              placeholderTextColor={isDarkMode ? '#999' : 'gray'}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <Feather 
              name="search" 
              size={20} 
              color={isDarkMode ? '#4DA8DA' : 'gray'}
              style={jobFinderStyles.searchIcon}
            />
          </View>
        </View>
        {filteredJobs.length === 0 ? (
          <View style={[jobFinderStyles.noJobsContainer, isDarkMode && jobFinderStyles.darkContainer]}>
            <Text style={[jobFinderStyles.noJobsText, isDarkMode && jobFinderStyles.darkText]}>
              {searchQuery ? 'No jobs found matching your search.' : 'No jobs available at the moment.'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredJobs}
            keyExtractor={(item) => item.id}
            renderItem={renderJobItem}
            contentContainerStyle={[
              jobFinderStyles.listContent,
              isDarkMode && jobFinderStyles.darkContainer,
              { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }
            ]}
            style={jobFinderStyles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const JobFinderWithStack: React.FC<JobFinderPageProps> = ({ 
  savedJobs, 
  appliedJobs,
  onSaveJob, 
  onRemoveJob,
  onApplyJob,
  onLogout
}) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, toggleTheme } = useTheme();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await fetch(API_URL);
        if (!jobsResponse.ok) throw new Error('Failed to fetch jobs.');
        const jobsData = await jobsResponse.json();

        let jobsArray = jobsData.jobs || jobsData;
        if (!Array.isArray(jobsArray)) throw new Error('Expected an array of jobs');

        const jobsWithIds: Job[] = jobsArray.map((job: any) => ({
          ...job,
          id: job.id || uuid.v4() as string,
        }));

        setJobs(jobsWithIds);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogoutPress = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: onLogout
        }
      ]
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Career Hunt" options={{ headerShown: false }}>
        {() => (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size = 24 }) => {
                let iconName: keyof typeof Ionicons.glyphMap =
                  route.name === 'JobFinder' ? 'briefcase' : 'bookmark';
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: isDarkMode ? '#4DA8DA' : 'rgb(255, 255, 255)',
              tabBarInactiveTintColor: 'rgb(182, 179, 179)',
              tabBarStyle: {
                backgroundColor: isDarkMode ? '#000' : 'rgb(30, 94, 191)',
                height: 70,
                paddingBottom: insets.bottom > 0 ? insets.bottom - 5 : 10,
                borderTopWidth: 0,
              },
              headerStyle: { 
                backgroundColor: isDarkMode ? '#000' : 'rgb(30, 94, 191)',
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerTintColor: 'white',
              headerLeft: () => (
                <View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity 
                    onPress={handleLogoutPress}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <MaterialIcons name="logout" size={24} color="white" />
                    <Text style={{ color: 'white', marginLeft: 5 }}>Logout</Text>
                  </TouchableOpacity>
                </View>
              ),
              headerRight: () => (
                <View style={{ marginRight: 15 }}>
                  <TouchableOpacity onPress={toggleTheme}>
                    <Ionicons 
                      name={isDarkMode ? 'sunny' : 'moon'} 
                      size={24} 
                      color="white" 
                    />
                  </TouchableOpacity>
                </View>
              ),
              gestureEnabled: false,
            })}
          >
            <Tab.Screen 
              name="JobFinder" 
              options={{
                title: 'Career Hunt',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            >
              {() => (
                <JobFinderScreen 
                  jobs={jobs}
                  loading={loading}
                  error={error}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onSaveJob={onSaveJob} 
                  savedJobs={savedJobs}
                  appliedJobs={appliedJobs}
                  onApplyJob={onApplyJob}
                  onLogout={onLogout}
                />
              )}
            </Tab.Screen>
            <Tab.Screen 
              name="Saved Jobs" 
              options={{
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            >
              {() => (
                <SavedJobsPage 
                  savedJobs={savedJobs} 
                  removeSavedJob={onRemoveJob} 
                  appliedJobs={appliedJobs}
                />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        )}
      </Stack.Screen>
      <Stack.Screen 
        name="ApplyJob" 
        options={{ 
          title: 'Apply for Job',
          headerStyle: {
            backgroundColor: isDarkMode ? '#000' : 'rgb(4, 92, 186)',
          },
          headerTintColor: 'white',
        }}
      >
        {(props) => (
          <ApplyJobScreen 
            {...props}
            onApplyJob={onApplyJob}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const JobFinderPage: React.FC<JobFinderPageProps> = (props) => {
  return <JobFinderWithStack {...props} />;
};

export default JobFinderPage;