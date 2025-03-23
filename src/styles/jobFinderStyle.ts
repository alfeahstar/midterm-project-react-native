import { StyleSheet } from 'react-native';

export const jobFinderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(240, 240, 240)', // Light background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgb(4, 92, 186)', // Same blue as WelcomePage
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
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
    width: '100%',
  },
  jobLogo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  company: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 5,
  },
  salary: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'rgb(4, 92, 186)',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  applyButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
