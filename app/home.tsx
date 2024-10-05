import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome,</Text>
        <Text style={styles.headerName}>Rahul</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="book-open" size={24} color="#8B0000" />
            <Text style={styles.actionText}>Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="activity" size={24} color="#8B0000" />
            <Text style={styles.actionText}>Mood Tracker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="phone" size={24} color="#8B0000" />
            <Text style={styles.actionText}>Get Help</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Reflection</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>How are you feeling today?</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Activities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.activityCard}>
              <Feather name="sun" size={24} color="#8B0000" />
              <Text style={styles.activityTitle}>Mindful Breathing</Text>
              <Text style={styles.activityDuration}>5 min</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityCard}>
              <Feather name="music" size={24} color="#8B0000" />
              <Text style={styles.activityTitle}>Calming Sounds</Text>
              <Text style={styles.activityDuration}>10 min</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityCard}>
              <Feather name="heart" size={24} color="#8B0000" />
              <Text style={styles.activityTitle}>Gratitude Journal</Text>
              <Text style={styles.activityDuration}>15 min</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.progressCard}>
            <Text style={styles.progressText}>You've completed 3 activities this week!</Text>
            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B0000',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerName: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    marginTop: 5,
    color: '#8B0000',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  activityCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    width: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityTitle: {
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityDuration: {
    marginTop: 5,
    color: '#888',
  },
  progressCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 10,
  },
  viewDetailsButton: {
    alignSelf: 'flex-end',
  },
  viewDetailsText: {
    color: '#8B0000',
    fontWeight: 'bold',
  },
});

export default HomePage;