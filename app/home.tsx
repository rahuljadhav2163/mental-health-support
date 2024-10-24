import React, { useState, useRef, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  DrawerLayoutAndroid,
  Animated,
  Platform,
  StatusBar,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Linking
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import MoodTracker from './moodtracker';

const positiveThoughts = [
  "Every day is a new beginning. Trust in your journey.",
  "You have the power to create positive changes in your life.",
  "Your mental health matters. Be gentle with yourself today.",
  "Small steps forward are still progress worth celebrating.",
  "You are stronger than you know and braver than you believe.",
  "Today's difficulties are tomorrow's growth opportunities.",
  "Your feelings are valid. It's okay to take time to process them.",
  "Remember to celebrate your progress, no matter how small.",
  "You deserve peace, love, and understanding.",
  "Healing takes time. Be patient with your journey.",
  "Your story matters. Your experiences have value.",
  "Each breath is a chance to reset and begin again.",
  "You are not alone. There's strength in seeking support.",
  "Your potential is limitless. Believe in yourself.",
  "Every moment is a fresh opportunity to choose happiness."
];

const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [journalModalVisible, setJournalModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const drawerAnimation = useRef(new Animated.Value(0)).current;
  const drawerRef = useRef(null);
  const [moodTrackerVisible, setMoodTrackerVisible] = useState(false);
  const [currentThought, setCurrentThought] = useState('');
  const [userName, setUserName] = useState('');
  const [meditationModalVisible, setMeditationModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);


  const recommendedActivities = [
    {
      name: 'Mindful Breathing',
      icon: 'wind',
      duration: '5 min',
      description: 'A simple breathing exercise to reduce stress and anxiety',
      steps: [
        'Find a comfortable seated position',
        'Close your eyes and take a deep breath',
        'Inhale for 4 counts through your nose',
        'Hold the breath for 4 counts',
        'Exhale for 4 counts through your mouth',
        'Repeat this cycle 10 times'
      ],
      benefits: [
        'Reduces stress and anxiety',
        'Improves focus and concentration',
        'Helps regulate emotions',
        'Can be done anywhere, anytime'
      ]
    },
    {
      name: 'Guided Meditation',
      icon: 'headphones',
      duration: '10 min',
      description: 'A guided meditation session for inner peace and clarity',
      steps: [
        'Find a quiet, comfortable space',
        'Put on headphones if available',
        'Close your eyes and focus on your breath',
        'Follow the guided visualization',
        'Notice your thoughts without judgment',
        'Slowly return to awareness when finished'
      ],
      benefits: [
        'Promotes emotional balance',
        'Enhances self-awareness',
        'Improves sleep quality',
        'Reduces negative thinking patterns'
      ]
    },
    {
      name: 'Gratitude Journal',
      icon: 'heart',
      duration: '15 min',
      description: 'Practice gratitude by writing down things youre thankful for',
      steps: [
        'Open your journal or notes app',
        'Write down 3 things youre grateful for today',
        'Reflect on why these things matter to you',
        'Add specific details about each item',
        'Notice how you feel after writing',
        'Make this a daily practice'
      ],
      benefits: [
        'Increases positive emotions',
        'Builds resilience',
        'Improves self-esteem',
        'Enhances overall well-being'
      ]
    }
  ];

  const meditations = [
    {
      id: 1,
      title: "Breathing Exercise",
      duration: "5 min",
      description: "Simple breathing exercise for stress relief",
      steps: [
        "Find a comfortable position",
        "Breathe in through your nose for 4 counts",
        "Hold for 4 counts",
        "Exhale through mouth for 4 counts",
        "Repeat 10 times"
      ]
    },
    {
      id: 2,
      title: "Body Scan Meditation",
      duration: "10 min",
      description: "Progressive relaxation from head to toe",
      steps: [
        "Lie down comfortably",
        "Close your eyes and take deep breaths",
        "Focus attention on your head",
        "Slowly move awareness down your body",
        "Release tension in each area"
      ]
    },
    {
      id: 3,
      title: "Mindful Walking",
      duration: "15 min",
      description: "Walking meditation for awareness",
      steps: [
        "Find a quiet path to walk",
        "Walk at a natural pace",
        "Notice the sensation in your feet",
        "Observe your surroundings mindfully",
        "Focus on the present moment"
      ]
    }
  ];

  const emergencyContacts = [
    {
      name: "National Crisis Hotline",
      number: "1-800-273-8255",
      available: "24/7"
    },
    {
      name: "Mental Health Emergency",
      number: "1-800-950-6264",
      available: "24/7"
    },
    {
      name: "Suicide Prevention Lifeline",
      number: "988",
      available: "24/7"
    }
  ];




  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    setActivityModalVisible(true);
  };

  const ActivityModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={activityModalVisible}
      onRequestClose={() => setActivityModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedActivity?.name}</Text>
            <TouchableOpacity onPress={() => setActivityModalVisible(false)}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.activityModalContent}>
            <View style={styles.activitySection}>
              <LinearGradient
                colors={['#00BFFF', '#4169E1']}
                style={styles.activityHeaderGradient}
              >
                <Feather name={selectedActivity?.icon} size={32} color="white" />
                <Text style={styles.activityDurationLarge}>{selectedActivity?.duration}</Text>
              </LinearGradient>
            </View>

            <Text style={styles.activityDescription}>{selectedActivity?.description}</Text>

            <Text style={styles.sectionHeader}>Steps to Follow:</Text>
            {selectedActivity?.steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}

            <Text style={styles.sectionHeader}>Benefits:</Text>
            {selectedActivity?.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Feather name="check-circle" size={20} color="#4169E1" />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.startActivityButton}
              onPress={() => {
                setActivityModalVisible(false);
                if (selectedActivity.name === 'Guided Meditation') {
                  setMeditationModalVisible(true);
                } else if (selectedActivity.name === 'Gratitude Journal') {
                  setJournalModalVisible(true);
                } else if (selectedActivity.name === 'Mindful Breathing') {
                  // You can add a specific breathing exercise modal here
                  setMeditationModalVisible(true);
                }
              }}
            >
              <LinearGradient
                colors={['#00BFFF', '#4169E1']}
                style={styles.startActivityGradient}
              >
                <Text style={styles.startActivityText}>Start Activity</Text>
                <Feather name="arrow-right" size={24} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );


  useEffect(() => {
    selectRandomThought();
  }, []);
  const selectRandomThought = () => {
    const randomIndex = Math.floor(Math.random() * positiveThoughts.length);
    setCurrentThought(positiveThoughts[randomIndex]);
  };

  const Profile = () => {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#00BFFF', '#4169E1']} style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </LinearGradient>
        <View style={styles.content}>
          <Text style={styles.title}>Your Profile</Text>
          {/* Add profile content here */}
        </View>
      </View>
    );
  };





  const toggleDrawer = () => {
    if (Platform.OS === 'android') {
      if (drawerRef.current) {
        if (drawerOpen) {
          drawerRef.current.closeDrawer();
        } else {
          drawerRef.current.openDrawer();
        }
      }
    } else {
      Animated.timing(drawerAnimation, {
        toValue: drawerOpen ? 0 : 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
      setDrawerOpen(!drawerOpen);
    }
  };

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const toggleJournalModal = () => {
    setJournalModalVisible(!journalModalVisible);
  };

  const handleQuickAction = (action) => {
    if (action === 'Journal') {
      toggleJournalModal();
    } else if (action === 'Mood') {
      setMoodTrackerVisible(true);
    } else if (action === 'Meditate') {
      setMeditationModalVisible(true);
    } else if (action === 'Get Help') {
      setHelpModalVisible(true);
    }
  };

  const startMeditation = (meditation) => {
    setSelectedMeditation(meditation);
  };

  const callEmergency = (number) => {
    Linking.openURL(`tel:${number}`);
  };
  const sendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { id: Date.now(), text: message, sender: 'user' }]);
      setMessage('');
      // Simulate a response from the chatbot
      setTimeout(() => {
        setChatMessages(prevMessages => [...prevMessages, { id: Date.now(), text: "Thanks for your message. How can I assist you today?", sender: 'bot' }]);
      }, 1000);
    }
  };


  const MeditationModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={meditationModalVisible}
      onRequestClose={() => setMeditationModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.meditationModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Meditation Guide</Text>
            <TouchableOpacity onPress={() => setMeditationModalVisible(false)}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.meditationContent}>
            {selectedMeditation ? (
              <View style={styles.meditationDetail}>
                <Text style={styles.meditationTitle}>{selectedMeditation.title}</Text>
                <Text style={styles.meditationDuration}>{selectedMeditation.duration}</Text>
                <Text style={styles.meditationDescription}>{selectedMeditation.description}</Text>
                <Text style={styles.stepsTitle}>Steps:</Text>
                {selectedMeditation.steps.map((step, index) => (
                  <Text key={index} style={styles.stepText}>
                    {index + 1}. {step}
                  </Text>
                ))}
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setSelectedMeditation(null)}
                >
                  <Text style={styles.backButtonText}>Back to List</Text>
                </TouchableOpacity>
              </View>
            ) : (
              meditations.map((meditation) => (
                <TouchableOpacity
                  key={meditation.id}
                  style={styles.meditationCard}
                  onPress={() => startMeditation(meditation)}
                >
                  <LinearGradient
                    colors={['#00BFFF', '#4169E1']}
                    style={styles.meditationGradient}
                  >
                    <Text style={styles.meditationCardTitle}>{meditation.title}</Text>
                    <Text style={styles.meditationCardDuration}>{meditation.duration}</Text>
                    <Text style={styles.meditationCardDescription}>
                      {meditation.description}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const HelpModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={helpModalVisible}
      onRequestClose={() => setHelpModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.helpModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Emergency Contacts</Text>
            <TouchableOpacity onPress={() => setHelpModalVisible(false)}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.helpContent}>
            <Text style={styles.helpText}>
              If you're experiencing a mental health emergency, please reach out to one of these support services:
            </Text>
            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contactCard}
                onPress={() => callEmergency(contact.number)}
              >
                <LinearGradient
                  colors={['#00BFFF', '#4169E1']}
                  style={styles.contactGradient}
                >
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactNumber}>{contact.number}</Text>
                  <Text style={styles.contactAvailable}>{contact.available}</Text>
                  <View style={styles.callButton}>
                    <Feather name="phone" size={20} color="white" />
                    <Text style={styles.callButtonText}>Call Now</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
            <Text style={styles.helpDisclaimer}>
              These services are confidential and available 24/7. Don't hesitate to reach out if you need support.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const DrawerContent = () => {
    const handleNavigation = (screenName) => {
      switch (screenName) {
        case 'Profile':
          router.push('/profile');
          break;
        case 'Journal':
          setJournalModalVisible(true);
          break;
        case 'Mood Tracker':
          setMoodTrackerVisible(true);
          break;
        case 'Meditation':
          setMeditationModalVisible(true);
          break;
        case 'Settings':
          router.push('/settings');
          break;
        case 'Help':
          setHelpModalVisible(true);
          break;
        default:
          break;
      }

      // Close drawer after navigation
      if (Platform.OS === 'android') {
        drawerRef.current?.closeDrawer();
      } else {
        setDrawerOpen(false);
      }
    };

    return (
      <LinearGradient colors={['#00BFFF', '#4169E1']} style={styles.drawerContent}>
        <Text style={styles.drawerTitle}>TogetherWeHeal</Text>
        {[
          { name: 'Profile', icon: 'user', route: '/profile' },
          { name: 'Journal', icon: 'book-open', route: 'journal' },
          { name: 'Mood Tracker', icon: 'activity', route: 'mood' },
          { name: 'Meditation', icon: 'headphones', route: 'meditation' },
          { name: 'Settings', icon: 'settings', route: '/settings' },
          { name: 'Help', icon: 'help-circle', route: 'help' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.drawerItem}
            onPress={() => handleNavigation(item.name)}
          >
            <Feather name={item.icon} size={24} color="#ffffff" style={styles.drawerItemIcon} />
            <Text style={styles.drawerItemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </LinearGradient>
    );
  };

  const JournalModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={journalModalVisible}
      onRequestClose={toggleJournalModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.journalModal}>
          <View style={styles.journalHeader}>
            <Text style={styles.modalTitle}>Journal</Text>
            <TouchableOpacity onPress={toggleJournalModal}>
              <Feather name="x" size={24} color="#333" />

            </TouchableOpacity>

          </View>
          <ScrollView style={styles.journalContent}>
            <Text style={styles.journalSectionTitle}>About Journaling</Text>
            <Text style={styles.journalText}>
              Journaling is a powerful tool for mental health and self-reflection. It can help you process emotions, track your progress, and gain insights into your thoughts and behaviors.
            </Text>
            <Text style={styles.journalSectionTitle}>Benefits of Journaling</Text>
            <Text style={styles.journalText}>
              • Reduces stress and anxiety{'\n'}
              • Improves emotional intelligence{'\n'}
              • Boosts memory and comprehension{'\n'}
              • Strengthens self-discipline{'\n'}
              • Enhances creativity
            </Text>
            <Text style={styles.journalSectionTitle}>Tips for Effective Journaling</Text>
            <Text style={styles.journalText}>
              1. Write regularly, even if it's just for a few minutes{'\n'}
              2. Be honest and write for yourself{'\n'}
              3. Don't worry about perfect grammar or spelling{'\n'}
              4. Use prompts if you're stuck{'\n'}
              5. Reflect on your entries periodically
            </Text>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const RecommendedActivities = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recommended Activities</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activitiesScroll}>
        {recommendedActivities.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.activityCard}
            onPress={() => handleActivitySelect(item)}
          >
            <LinearGradient
              colors={['#00BFFF', '#4169E1']}
              style={styles.activityGradient}
            >
              <Feather name={item.icon} size={24} color="white" />
              <Text style={styles.activityTitle}>{item.name}</Text>
              <Text style={styles.activityDuration}>{item.duration}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const MainContent = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#00BFFF', '#4169E1']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.appname}>TogetherWeHeal</Text>
          <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
            <Feather name="menu" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Welcome, {userName || 'Friend'}</Text>
          <Text style={styles.headerSubText}>How are you feeling today?</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.thoughtCard}>
          <LinearGradient
            colors={['#4169E1', '#00BFFF']}
            style={styles.thoughtGradient}
          >
            <Text style={styles.thoughtText}>"{currentThought}"</Text>
          </LinearGradient>
        </View>

        <View style={styles.quickActions}>
          {[
            { name: 'Journal', icon: 'book-open' },
            { name: 'Mood', icon: 'smile' },
            { name: 'Meditate', icon: 'headphones' },
            { name: 'Get Help', icon: 'phone' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionButton}
              onPress={() => handleQuickAction(item.name)}
            >
              <LinearGradient
                colors={['#00BFFF', '#4169E1']}
                style={styles.actionGradient}
              >
                <Feather name={item.icon} size={24} color="white" />
              </LinearGradient>
              <Text style={styles.actionText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meeting With Professional</Text>
          <TouchableOpacity style={styles.reflectionCard}>
            <LinearGradient
              colors={['#00BFFF', '#4169E1']}
              style={styles.reflectionGradient}
            >
              <Text style={styles.reflectionText}>Take a moment to reflect on your day</Text>
              <Feather name="chevron-right" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <RecommendedActivities />
      </ScrollView>

      <TouchableOpacity style={styles.chatButton} onPress={toggleChat}>
        <LinearGradient colors={['#00BFFF', '#4169E1']} style={styles.chatButtonGradient}>
          <Feather name="message-circle" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={chatVisible}
        onRequestClose={toggleChat}
      >
        <View style={styles.modalBackground}>
          <View style={styles.chatModal}>
            <View style={styles.chatHeader}>
              <Text style={styles.modalTitle}>Chat with Us</Text>
              <TouchableOpacity onPress={toggleChat}>
                <Feather name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={chatMessages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              )}
              style={styles.chatMessages}
            />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.chatInputContainer}>
              <TextInput
                style={styles.chatInput}
                placeholder="Type your message..."
                placeholderTextColor="#aaa"
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Feather name="send" size={24} color="white" />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>

      <JournalModal />
      <MeditationModal />
      <HelpModal />
      <ActivityModal />
      <MoodTracker
        visible={moodTrackerVisible}
        onClose={() => setMoodTrackerVisible(false)}
      />
    </SafeAreaView>
  );

  if (Platform.OS === 'android') {
    return (
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={250}
        drawerPosition="left"
        renderNavigationView={() => <DrawerContent />}
        onDrawerOpen={() => setDrawerOpen(true)}
        onDrawerClose={() => setDrawerOpen(false)}
      >
        <MainContent />
      </DrawerLayoutAndroid>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [
              {
                translateX: drawerAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-250, 0],
                }),
              },
            ],
          },
        ]}
      >
        <DrawerContent />
      </Animated.View>
      <>
        <MainContent />
        <MeditationModal />
        <HelpModal />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  activityModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  activityModalContent: {
    padding: 20,
  },
  activitySection: {
    marginBottom: 20,
  },
  activityHeaderGradient: {
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityDurationLarge: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  activityDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4169E1',
    marginTop: 20,
    marginBottom: 15,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  startActivityButton: {
    marginTop: 30,
    marginBottom: 20,
  },
  startActivityGradient: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startActivityText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  meditationModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  helpModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  meditationContent: {
    padding: 15,
  },
  helpContent: {
    padding: 15,
  },
  meditationCard: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  meditationGradient: {
    padding: 20,
  },
  meditationCardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  meditationCardDuration: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
  meditationCardDescription: {
    color: 'white',
    fontSize: 14,
  },
  meditationDetail: {
    padding: 20,
  },
  meditationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4169E1',
  },
  meditationDuration: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  meditationDescription: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4169E1',
  },
  stepText: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: '#4169E1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#333',
  },
  contactCard: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  contactGradient: {
    padding: 20,
  },
  contactName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactNumber: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactAvailable: {
    color: 'white',
    fontSize: 14,
    marginBottom: 15,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  callButtonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  helpDisclaimer: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  appname: {
    fontSize: 21,
    color: "#ffff66"
  },
  thoughtCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 10
  },
  thoughtGradient: {
    padding: 20,
    alignItems: 'center',
  },
  thoughtText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 50,
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  drawerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 22
  },
  drawerBody: {
    flex: 1,
    paddingTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  drawerItemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  drawerItemText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '500',
    paddingLeft: 10,
  },
  container: {
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
  menuButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 10 : 5,
    right: 0,
    zIndex: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
  chatButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: -5,
    marginTop: 10
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    width: '23%',
  }, actionGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reflectionCard: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  reflectionGradient: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reflectionText: {
    color: 'white',
    fontSize: 16,
  },
  activitiesScroll: {
    paddingVertical: 10,
  },
  activityCard: {
    width: 140,
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
  },
  activityGradient: {
    padding: 20,
    alignItems: 'center',
  },
  activityTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  activityDuration: {
    color: 'white',
    marginTop: 5,
  },
  progressCard: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  progressText: {
    fontSize: 16,
    marginBottom: 10,
  },
  viewDetailsButton: {
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: '#00BFFF',
    borderRadius: 5,
  },
  viewDetailsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  chatModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatMessages: {
    flex: 1,
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8E8',
  },
  messageText: {
    fontSize: 16,
  },
  chatInputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  chatInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
  },
  journalModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  journalContent: {
    padding: 20,
  },
  journalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#4169E1',
  },
  journalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  startJournalingButton: {
    backgroundColor: '#4169E1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  startJournalingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }

});

export default HomePage;
