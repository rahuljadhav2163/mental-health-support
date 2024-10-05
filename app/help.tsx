import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const HelpPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

        <Text style={styles.headerText}>Help & Support</Text>
       
        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
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
          <TouchableOpacity style={styles.optionCard}>
            <Feather name="message-square" size={24} color="#8B0000" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Chat with a Counselor</Text>
              <Text style={styles.optionDescription}>Connect with a professional via text chat</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#8B0000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard}>
            <Feather name="video" size={24} color="#8B0000" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Video Consultation</Text>
              <Text style={styles.optionDescription}>Schedule a video call with a therapist</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#8B0000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard}>
            <Feather name="users" size={24} color="#8B0000" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Support Groups</Text>
              <Text style={styles.optionDescription}>Join online group therapy sessions</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#8B0000" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Self-Help Resources</Text>
          <TouchableOpacity style={styles.resourceCard}>
            <Feather name="book-open" size={24} color="#8B0000" />
            <Text style={styles.resourceTitle}>Mental Health Articles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceCard}>
            <Feather name="film" size={24} color="#8B0000" />
            <Text style={styles.resourceTitle}>Guided Meditation Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceCard}>
            <Feather name="clipboard" size={24} color="#8B0000" />
            <Text style={styles.resourceTitle}>Self-Assessment Tools</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQ</Text>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I book an appointment?</Text>
            <Feather name="chevron-down" size={24} color="#8B0000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Is my information confidential?</Text>
            <Feather name="chevron-down" size={24} color="#8B0000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What if I'm in crisis?</Text>
            <Feather name="chevron-down" size={24} color="#8B0000" />
          </TouchableOpacity>
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
    paddingTop:25
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  emergencySection: {
    backgroundColor: '#FFE5E5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8B0000',
  },
  emergencyButton: {
    backgroundColor: '#8B0000',
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