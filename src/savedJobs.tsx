import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { jobFinderStyles } from './styles/jobFinderStyle';
import { globalStyles } from './styles/globalStyles';
import { useTheme } from './ThemeContext';

const SavedJobsPage = () => {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView style={[{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }, isDarkMode && globalStyles.darkContainer]}>
      <View style={jobFinderStyles.container}>
        <Text style={[jobFinderStyles.title, isDarkMode && globalStyles.darkText]}>
          Saved Jobs
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SavedJobsPage;
