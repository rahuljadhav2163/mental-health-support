import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const HelpPage = () => {
  const [expandedFaq, setExpandedFaq] = useState({});
  const [rotationAnimation] = useState(new Animated.Value(0));

  const faqData = [
    {
      question: 'How do I book an appointment?',
      answer: [
        {
          type: 'text',
          content: 'Follow these simple steps to book your appointment:'
        },
        {
          type: 'steps',
          content: [
            'Open the Support Options section at the top of the page',
            'Choose either "Chat with a Counselor" or "Video Consultation"',
            'Browse available time slots in the calendar',
            'Select your preferred counselor from the list',
            'Confirm your booking details'
          ]
        },
        {
          type: 'note',
          content: 'You will receive an immediate confirmation email with your appointment details and preparation instructions.'
        }
      ]
    },
    {
      question: 'Is my information confidential?',
      answer: [
        {
          type: 'text',
          content: 'Yes, we take your privacy very seriously. All your information is protected by:'
        },
        {
          type: 'bullets',
          content: [
            'HIPAA compliance standards',
            'End-to-end encryption',
            'Secure data storage',
            'Strict access controls'
          ]
        },
        {
          type: 'note',
          content: 'Only your assigned healthcare provider has access to your personal information and session details.'
        }
      ]
    },
    {
      question: 'What if Im in crisis?',
      answer: [
        {
          type: 'important',
          content: 'If youre experiencing a crisis, immediate help is available:'
        },
        {
          type: 'emergency',
          content: [
            'Call 911 for immediate emergency assistance',
            'Contact our 24/7 Crisis Hotline: 1-800-XXX-XXXX',
            'Use the RED emergency button in the app'
          ]
        },
        {
          type: 'note',
          content: 'Dont wait - trained professionals are available 24/7 to help you.'
        }
      ]
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
    
    Animated.spring(rotationAnimation, {
      toValue: expandedFaq[index] ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const renderAnswerContent = (content, type) => {
    switch (type) {
      case 'steps':
        return (
          <View style={styles.stepsContainer}>
            {content.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        );
      
      case 'bullets':
        return (
          <View style={styles.bulletsContainer}>
            {content.map((bullet, index) => (
              <View key={index} style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        );
      
      case 'emergency':
        return (
          <View style={styles.emergencyContainer}>
            {content.map((item, index) => (
              <TouchableOpacity key={index} style={styles.emergencyItem}>
                <Feather name="alert-circle" size={20} color="#FF4444" />
                <Text style={styles.emergencyText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      
      case 'important':
      case 'note':
        return (
          <View style={[styles.noteContainer, type === 'important' && styles.importantContainer]}>
            <Feather 
              name={type === 'important' ? 'alert-triangle' : 'info'} 
              size={20} 
              color={type === 'important' ? '#FF4444' : '#4169E1'} 
            />
            <Text style={[styles.noteText, type === 'important' && styles.importantText]}>
              {content}
            </Text>
          </View>
        );
      
      default:
        return <Text style={styles.answerText}>{content}</Text>;
    }
  };

  return (
    <LinearGradient colors={['#00BFFF', '#4169E1']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Help & Support</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>We Provide</Text>
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
            <Text style={styles.sectionTitle}>FAQ</Text>
            {faqData.map((faq, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.faqItem, expandedFaq[index] && styles.faqItemExpanded]}
                onPress={() => toggleFaq(index)}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Animated.View style={{
                    transform: [{
                      rotate: rotationAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg']
                      })
                    }]
                  }}>
                    <Feather 
                      name="chevron-down"
                      size={24} 
                      color="#4169E1" 
                    />
                  </Animated.View>
                </View>
                {expandedFaq[index] && (
                  <View style={styles.faqAnswerContainer}>
                    {faq.answer.map((section, sectionIndex) => (
                      <View key={sectionIndex} style={styles.answerSection}>
                        {renderAnswerContent(section.content, section.type)}
                      </View>
                    ))}
                  </View>
                )}
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
  faqItem: {
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
  faqItemExpanded: {
    backgroundColor: '#F8F9FF',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    paddingRight: 10,
  },
  faqAnswerContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  answerSection: {
    marginBottom: 15,
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  stepsContainer: {
    marginVertical: 10,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  bulletsContainer: {
    marginVertical: 10,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4169E1',
    marginRight: 10,
  },
  bulletText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  emergencyContainer: {
    backgroundColor: '#FFF5F5',
    borderRadius: 10,
    padding: 12,
    marginVertical: 5,
  },
  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#FF4444',
    flex: 1,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0F7FF',
    borderRadius: 10,
    padding: 12,
    marginVertical: 5,
  },
  importantContainer: {
    backgroundColor: '#FFF5F5',
  },
  noteText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#4169E1',
    flex: 1,
    lineHeight: 20,
  },
  importantText: {
    color: '#FF4444',
  }
});

export default HelpPage;