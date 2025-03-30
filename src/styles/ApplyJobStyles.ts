import { StyleSheet } from 'react-native';

export const applyJobStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'rgb(221, 235, 253)',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
    textAlign: 'center',
  },
  company: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    backgroundColor: 'rgb(3, 74, 150)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  
  // Dark mode styles
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkSubtext: {
    color: '#AAAAAA',
  },
  darkInput: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333',
    color: '#FFFFFF',
  },
disabledInput: {
  backgroundColor: '#F3F4F6',
  color: '#6B7280',
},
disabledTextArea: {
  backgroundColor: '#F3F4F6',
  color: '#6B7280',
  height: 150,
},
disabledLabel: {
  color: '#6B7280',
},
disabledText: {
  color: '#6B7280',
},
disabledSubtext: {
  color: '#9CA3AF',
},
disabledPlaceholder: {
  color: '#9CA3AF',
},

darkDisabledInput: {
  backgroundColor: '#2D2D2D',
  color: '#A1A1A1',
},
darkDisabledTextArea: {
  backgroundColor: '#2D2D2D',
  color: '#A1A1A1',
  height: 150,
},
darkDisabledLabel: {
  color: '#A1A1A1',
},
darkDisabledText: {
  color: '#A1A1A1',
},
darkDisabledSubtext: {
  color: '#7A7A7A',
},
darkDisabledPlaceholder: {
  color: '#7A7A7A',
},
});