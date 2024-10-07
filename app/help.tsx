import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const HelpPage = () => {
  return (
    <LinearGradient  colors={['#00BFFF', '#4169E1']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Help & Support</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.emergencySection}>
            <Text style={styles.emergencyTitle}>Need immediate help?</Text>
            <TouchableOpacity style={styles.emergencyButton}>
              <Feather name="phone-call" size={24} color="white" />
              <Text style={styles.emergencyButtonText}>Call Emergency Helpline</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support Options</Text>
            {[
              { icon: 'message-square', title: 'Chat with a Counselor', description: 'Connect with a professional via text chat' },
              { icon: 'video', title: 'Video Consultation', description: 'Schedule a video call with a therapist' },
              { icon: 'users', title: 'Support Groups', description: 'Join online group therapy sessions' },
            ].map((option, index) => (
              <TouchableOpacity key={index} style={styles.optionCard}>
                <Feather name={option.icon} size={24} color="#4169E1" />
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <Feather name="chevron-right" size={24} color="#4169E1" />
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Self-Help Resources</Text>
            {[
              { icon: 'book-open', title: 'Mental Health Articles' },
              { icon: 'film', title: 'Guided Meditation Videos' },
              { icon: 'clipboard', title: 'Self-Assessment Tools' },
            ].map((resource, index) => (
              <TouchableOpacity key={index} style={styles.resourceCard}>
                <Feather name={resource.icon} size={24} color="#4169E1" />
                <Text style={styles.resourceTitle}>{resource.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FAQ</Text>
            {[
              'How do I book an appointment?',
              'Is my information confidential?',
              'What if Im in crisis?',
            ].map((question, index) => (
              <TouchableOpacity key={index} style={styles.faqItem}>
                <Text style={styles.faqQuestion}>{question}</Text>
                <Feather name="chevron-down" size={24} color="#4169E1" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  backButton: {
    padding: 10,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  emergencySection: {
    backgroundColor: '#E6F3FF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4169E1',
  },
  emergencyButton: {
    backgroundColor: '#4169E1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 25,
  },
  emergencyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
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
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resourceTitle: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqQuestion: {
    fontSize: 16,
    color: '#333',
  },
});

export default HelpPage;