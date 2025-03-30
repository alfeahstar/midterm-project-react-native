import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Welcome: undefined;
  JobFinderPage: undefined | { screen: string };
  ApplyJob: { 
    jobId: string; 
    jobTitle: string; 
    company: string;
    routeName: 'JobFinderPage' | 'SavedJobsPage';
  };
};

export type TabParamList = {
  JobFinder: undefined;
  'Saved Jobs': undefined;
};

export type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;


export type JobFinderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'JobFinderPage'
>;


export type ApplyJobScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ApplyJob'
>;


export type ApplyJobScreenRouteProp = RouteProp<RootStackParamList, 'ApplyJob'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}