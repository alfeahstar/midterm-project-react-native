import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    width: '100%',
    height: '100%',
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  contentWrapper: {
    alignItems: 'center', 
  },
  title: {
    position: 'absolute', 
    top: '23%', 
    fontSize: 43,
    fontWeight: '800',
    textAlign: 'center',
    color: 'rgb(30, 94, 191)',
  },
  darkText: {
    color: 'white', 
  },
  button: {
    position: 'absolute', 
    bottom: 50, 
    paddingVertical: 17,
    width: '90%',
    borderRadius: 15,

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gif: {
    width: 650,
    height: 650,
    marginBottom: 50,
    marginLeft: 15,
  },
  toggleButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  darkCard: {
    backgroundColor: '#2A2A2A', 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  darkTextInput: { 
    color: '#fff',
    backgroundColor: '#333',
    borderColor: '#555',
  },
  innerContainer: {  
    flex: 1,
    width: '100%',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
