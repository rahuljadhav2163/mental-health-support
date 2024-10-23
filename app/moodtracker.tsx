import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Modal,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

const MOOD_HISTORY_KEY = 'mood_history_data';

const MoodTracker = ({ visible, onClose }) => {
  const [moodHistory, setMoodHistory] = useState([]);
  const moods = ['😊 Happy', '😐 Neutral', '😢 Sad', '😠 Angry', '😴 Tired', '😴 Sleep'];

  useEffect(() => {
    loadMoodHistory();
  }, []);

  const loadMoodHistory = async () => {
    try {
      const storedMoodHistory = await SecureStore.getItemAsync(MOOD_HISTORY_KEY);
      if (storedMoodHistory) {
        setMoodHistory(JSON.parse(storedMoodHistory));
      }
    } catch (error) {
      console.error('Error loading mood history:', error);
      Alert.alert(
        'Error',
        'Failed to load mood history. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const saveMoodHistory = async (newMoodHistory) => {
    try {
      await SecureStore.setItemAsync(
        MOOD_HISTORY_KEY,
        JSON.stringify(newMoodHistory)
      );
    } catch (error) {
      console.error('Error saving mood history:', error);
      Alert.alert(
        'Error',
        'Failed to save mood entry. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const trackMood = async (mood) => {
    try {
      const newMoodEntry = {
        mood,
        date: new Date().toISOString(),
        id: Date.now().toString() // Adding unique ID for each entry
      };
      
      const newMoodHistory = [newMoodEntry, ...moodHistory];
      
      // Limit history to last 30 entries to prevent storage issues
      const trimmedHistory = newMoodHistory.slice(0, 30);
      
      await saveMoodHistory(trimmedHistory);
      setMoodHistory(trimmedHistory);
      
      Alert.alert(
        'Success',
        'Your mood has been recorded!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error tracking mood:', error);
      Alert.alert(
        'Error',
        'Failed to track mood. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const clearMoodHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all mood history? This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await SecureStore.deleteItemAsync(MOOD_HISTORY_KEY);
              setMoodHistory([]);
              Alert.alert('Success', 'Mood history cleared successfully');
            } catch (error) {
              console.error('Error clearing mood history:', error);
              Alert.alert('Error', 'Failed to clear mood history');
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.moodTrackerModal}>
          <LinearGradient colors={['#00BFFF', '#4169E1']} style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Feather name="x" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Mood Tracker</Text>
              <Text style={styles.headerSubText}>How are you feeling?</Text>
            </View>
          </LinearGradient>

          <ScrollView style={styles.content}>
            <View style={styles.moodButtons}>
              {moods.map((mood, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.moodButton}
                  onPress={() => trackMood(mood)}
                >
                  <LinearGradient
                    colors={['#00BFFF', '#4169E1']}
                    style={styles.moodButtonGradient}
                  >
                    <Text style={styles.moodButtonText}>{mood}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Mood History</Text>
                {moodHistory.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearMoodHistory}
                  >
                    <Text style={styles.clearButtonText}>Clear History</Text>
                  </TouchableOpacity>
                )}
              </View>
              {moodHistory.length === 0 ? (
                <Text style={styles.emptyHistoryText}>
                  No mood entries yet. Start tracking your mood!
                </Text>
              ) : (
                moodHistory.map((entry) => (
                  <View key={entry.id} style={styles.historyItem}>
                    <Text style={styles.historyMood}>{entry.mood}</Text>
                    <Text style={styles.historyDate}>
                      {formatDate(entry.date)}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  moodTrackerModal: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 180,
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerContent: {
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubText: {
    color: 'white',
    fontSize: 18,
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  moodButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodButton: {
    width: '48%',
    marginBottom: 10,
  },
  moodButtonGradient: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  moodButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  historyMood: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyDate: {
    color: '#777',
  },
  emptyHistoryText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default MoodTracker;