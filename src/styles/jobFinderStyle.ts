import { StyleSheet } from 'react-native';

export const jobFinderStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'rgb(203, 223, 248)',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: 'rgb(203, 223, 248)',
  },
  searchInputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderColor: '#1F509A',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    paddingRight: 40,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: 19,
    zIndex: 1,
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  jobLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  saveIconButton: {
    padding: 5,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  company: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  salary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 15,
  },
  applyButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  applyButtonText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appliedButton: {
    backgroundColor: '#4CAF50',
  },
  noJobsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  noJobsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 0,
    paddingTop: 10,
  },
  listContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(203, 223, 248)',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
  },
  // Dark mode styles
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  darkSearchContainer: {
    backgroundColor: '#1E1E1E',
  },
  darkText: {
    color: 'white',
  },
  darkCard: {
    backgroundColor: '#2A2A2A',
  },
  darkTextInput: {
    color: '#fff',
    backgroundColor: '#333',
    borderColor: '#555',
  },
});