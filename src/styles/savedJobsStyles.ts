import { StyleSheet } from 'react-native';

export const savedJobStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFD',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'rgb(203, 223, 248)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 4,
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    color: '#666',
  },
  cardFooter: {
    marginBottom: 12,
  },
  salary: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
    marginLeft: 52,
    top: -8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  removeButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF5252',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  removeIcon: {
    marginRight: 6,
  },
  removeButtonText: {
    color: '#FF5252',
    fontSize: 14,
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 100,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  appliedButton: {
    backgroundColor: '#4CAF50',
  },
  listContent: {
    paddingBottom: 16,
  },
  listContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Dark mode styles
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkCard: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkSubtext: {
    color: '#AAAAAA',
  },
  darkEmptyState: {
    backgroundColor: '#121212',
  },
  darkEmptyText: {
    color: '#DDD',
  },
  darkEmptySubtext: {
    color: '#999',
  },
  darkRemoveButton: {
    backgroundColor: '#1E1E1E',
    borderColor: '#FF6B6B',
  },
  darkRemoveButtonText: {
    color: '#FF6B6B',
  },
});