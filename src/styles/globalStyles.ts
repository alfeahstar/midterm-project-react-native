import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers content
    alignItems: 'center',
    backgroundColor: 'rgb(171, 206, 244)',
  },
  darkContainer: {
    backgroundColor: '#1E1E1E', // Dark mode background
  },
  contentWrapper: {
    alignItems: 'center', // Keeps title and GIF centered together
  },
  title: {
    position: 'absolute', // Keeps title at center without affecting GIF
    top: '70%', // Adjusts vertical position
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  darkText: {
    color: 'white', // Dark mode text color
  },
  button: {
    position: 'absolute', // Pins button at the bottom
    bottom: 50, // Distance from the bottom
    backgroundColor: 'rgb(4, 92, 186)',
    paddingVertical: 15,
    paddingHorizontal: 150,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gif: {
    width: 600,
    height: 600,
    marginBottom: 150,
    marginLeft: 15,
  },
  toggleButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
});
