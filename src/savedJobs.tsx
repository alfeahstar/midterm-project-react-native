import React from "react";
import {View,Text,SafeAreaView,FlatList,Image,TouchableOpacity,} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "./ThemeContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./navigationTypes";
import { savedJobStyles } from "./styles/savedJobsStyles";
import { Job } from './type';
import { Ionicons } from '@expo/vector-icons';

interface SavedJobsPageProps {
  savedJobs: Job[];
  removeSavedJob: (jobId: string) => void;
  appliedJobs: string[];
}

const SavedJobsPage: React.FC<SavedJobsPageProps> = ({ 
  savedJobs, 
  removeSavedJob,
  appliedJobs
}) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleApplyPress = (jobId: string, jobTitle: string, company: string) => {
    navigation.navigate('ApplyJob', { 
      jobId, 
      jobTitle, 
      company,
      routeName: 'SavedJobsPage' // Fixed to match navigationTypes
    });
  };

  const renderJobItem = ({ item }: { item: Job }) => {
    const isApplied = appliedJobs.includes(item.id);
    
    return (
      <View style={[savedJobStyles.jobCard, isDarkMode && savedJobStyles.darkCard]}>
        <View style={savedJobStyles.cardHeader}>
          <Image source={{ uri: item.companyLogo }} style={savedJobStyles.jobLogo} />
          <View style={savedJobStyles.jobInfo}>
            <Text style={[savedJobStyles.jobTitle, isDarkMode && savedJobStyles.darkText]}>
              {item.title}
            </Text>
            <Text style={[savedJobStyles.company, isDarkMode && savedJobStyles.darkText]}>
              {item.companyName}
            </Text>
          </View>
        </View>
        
        <View style={savedJobStyles.cardFooter}>
          <Text style={[savedJobStyles.salary, isDarkMode && savedJobStyles.darkText]}>
            {item.minSalary && item.maxSalary
              ? `$${item.minSalary} - $${item.maxSalary}`
              : "Salary not disclosed"}
          </Text>
        </View>

        <View style={savedJobStyles.buttonContainer}>
          <TouchableOpacity
            style={[savedJobStyles.removeButton, isDarkMode && savedJobStyles.darkRemoveButton]}
            onPress={() => removeSavedJob(item.id)}
          >
            <Ionicons 
              name="trash-outline" 
              size={16} 
              color={isDarkMode ? '#FF6B6B' : '#FF5252'} 
              style={savedJobStyles.removeIcon}
            />
            <Text style={[savedJobStyles.removeButtonText, isDarkMode && savedJobStyles.darkRemoveButtonText]}>
              Remove
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[savedJobStyles.applyButton, isApplied && savedJobStyles.appliedButton]}
            onPress={() => !isApplied && handleApplyPress(item.id, item.title, item.companyName)}
            disabled={isApplied}
          >
            <Text style={savedJobStyles.applyButtonText}>
              {isApplied ? 'Applied ✓' : 'Apply Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[savedJobStyles.safeArea, isDarkMode && savedJobStyles.darkContainer]}>
      <View style={[savedJobStyles.container, isDarkMode && savedJobStyles.darkContainer]}>
        <Text style={[savedJobStyles.headerTitle, isDarkMode && savedJobStyles.darkText]}>
          My Saved Jobs
        </Text>
        <Text style={[savedJobStyles.subtitle, isDarkMode && savedJobStyles.darkSubtext]}>
          {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
        </Text>

        {savedJobs.length === 0 ? (
          <View style={[savedJobStyles.emptyState, isDarkMode && savedJobStyles.darkEmptyState]}>
            <Ionicons 
              name="bookmark-outline" 
              size={48} 
              color={isDarkMode ? '#555' : '#aaa'} 
              style={savedJobStyles.emptyIcon}
            />
            <Text style={[savedJobStyles.emptyText, isDarkMode && savedJobStyles.darkEmptyText]}>
              No saved jobs yet
            </Text>
            <Text style={[savedJobStyles.emptySubtext, isDarkMode && savedJobStyles.darkEmptySubtext]}>
              Save jobs you're interested in to view them here
            </Text>
          </View>
        ) : (
          <FlatList
            data={savedJobs}
            keyExtractor={(item) => item.id}
            renderItem={renderJobItem}
            contentContainerStyle={savedJobStyles.listContent}
            style={savedJobStyles.listContainer}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ height: insets.bottom > 0 ? insets.bottom : 20 }} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SavedJobsPage;