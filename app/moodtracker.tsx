import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodTracker = ({ visible, onClose }) => {
  const [moodHistory, setMoodHistory] = useState([]);
  const moods = ['😊 Happy', '😐 Neutral', '😢 Sad', '😠 Angry', '😴 Tired','😴 Sleep'];

  useEffect(() => {
    loadMoodHistory();
  }, []);

  const loadMoodHistory = async () => {
    try {
      const storedMoodHistory = await AsyncStorage.getItem('moodHistory');
      if (storedMoodHistory !== null) {
        setMoodHistory(JSON.parse(storedMoodHistory));
      }
    } catch (error) {
      console.error('Error loading mood history:', error);
    }
  };

  const saveMoodHistory = async (newMoodHistory) => {
    try {
      await AsyncStorage.setItem('moodHistory', JSON.stringify(newMoodHistory));
    } catch (error) {
      console.error('Error saving mood history:', error);
    }
  };

  const trackMood = (mood) => {
    const newMoodEntry = { mood, date: new Date().toISOString() };
    const newMoodHistory = [newMoodEntry, ...moodHistory];
    setMoodHistory(newMoodHistory);
    saveMoodHistory(newMoodHistory);
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
              <Text style={styles.sectionTitle}>Mood History</Text>
              {moodHistory.map((entry, index) => (
                <View key={index} style={styles.historyItem}>
                  <Text style={styles.historyMood}>{entry.mood}</Text>
                  <Text style={styles.historyDate}>
                    {new Date(entry.date).toLocaleString()}
                  </Text>
                </View>
              ))}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  historyMood: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyDate: {
    color: '#777',
  },
});

export default MoodTracker;