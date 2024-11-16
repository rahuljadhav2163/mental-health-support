import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const CHATBOT_RESPONSES = {
  GREETING: [
    "Hello! I'm here to support you. How are you feeling today?",
    "Welcome! How can I help you today?",
    "Hi! I'm your mental wellness companion. What's on your mind?"
  ],
  MOOD_CHECK: [
    "Would you like to track your mood right now?",
    "Have you used our mood tracker today?",
    "Remember, tracking your mood can help you understand your emotional patterns better."
  ],
  MEDITATION: [
    "Taking time to meditate can really help. Would you like to try a quick meditation session?",
    "I can guide you through some breathing exercises. Would that help?",
    "Let's take a moment to center ourselves. Would you like to explore our meditation guides?"
  ],
  JOURNALING: [
    "Writing down your thoughts can be therapeutic. Would you like to open the journal?",
    "Have you tried journaling today? It might help process your feelings.",
    "Sometimes putting thoughts on paper helps clear the mind. Want to write in your journal?"
  ],
  EMERGENCY: [
    "I hear that you're going through a difficult time. Would you like to see our emergency contacts?",
    "Your well-being is important. I can connect you with professional help right away.",
    "You don't have to face this alone. Let me show you some immediate support options."
  ],
  ENCOURAGEMENT: [
    "You're taking positive steps by reaching out. That takes courage.",
    "Remember, it's okay to have difficult days. You're doing the best you can.",
    "You're stronger than you know, and it's okay to ask for help."
  ]
};

const KEYWORDS = {
  EMERGENCY: ['crisis', 'suicide', 'emergency', 'help', 'scared', 'desperate', 'hurt'],
  ANXIETY: ['anxious', 'worried', 'nervous', 'panic', 'stress', 'overwhelmed'],
  DEPRESSION: ['sad', 'depressed', 'lonely', 'hopeless', 'tired', 'empty'],
  MEDITATION: ['meditate', 'calm', 'peace', 'quiet', 'breath', 'relax'],
  MOOD: ['mood', 'feeling', 'emotions', 'feel'],
  JOURNAL: ['write', 'journal', 'diary', 'thoughts', 'express']
};

export default function Chatbot() {
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const analyzeSentiment = (message) => {
    message = message.toLowerCase();
    for (const [category, words] of Object.entries(KEYWORDS)) {
      if (words.some(word => message.includes(word))) {
        return category;
      }
    }
    return 'GENERAL';
  };

  const generateResponse = (message) => {
    const sentiment = analyzeSentiment(message);
    let response = '';
    let action = null;

    switch (sentiment) {
      case 'EMERGENCY':
        response = CHATBOT_RESPONSES.EMERGENCY[Math.floor(Math.random() * CHATBOT_RESPONSES.EMERGENCY.length)];
        action = 'SHOW_HELP_MODAL';
        break;
      case 'ANXIETY':
      case 'DEPRESSION':
        response = CHATBOT_RESPONSES.MEDITATION[Math.floor(Math.random() * CHATBOT_RESPONSES.MEDITATION.length)];
        action = 'SHOW_MEDITATION_MODAL';
        break;
      case 'MEDITATION':
        response = CHATBOT_RESPONSES.MEDITATION[Math.floor(Math.random() * CHATBOT_RESPONSES.MEDITATION.length)];
        action = 'SHOW_MEDITATION_MODAL';
        break;
      case 'MOOD':
        response = CHATBOT_RESPONSES.MOOD_CHECK[Math.floor(Math.random() * CHATBOT_RESPONSES.MOOD_CHECK.length)];
        action = 'SHOW_MOOD_TRACKER';
        break;
      case 'JOURNAL':
        response = CHATBOT_RESPONSES.JOURNALING[Math.floor(Math.random() * CHATBOT_RESPONSES.JOURNALING.length)];
        action = 'SHOW_JOURNAL_MODAL';
        break;
      default:
        response = CHATBOT_RESPONSES.ENCOURAGEMENT[Math.floor(Math.random() * CHATBOT_RESPONSES.ENCOURAGEMENT.length)];
    }

    return { text: response, action };
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user'
      };
      setChatMessages(prevMessages => [...prevMessages, userMessage]);
      
      // Clear input after sending
      setInputMessage('');

      // Generate and add bot response
      const { text, action } = generateResponse(inputMessage);
      setTimeout(() => {
        setChatMessages(prevMessages => [
          ...prevMessages,
          {
            id: Date.now(),
            text: text,
            sender: 'bot'
          }
        ]);

        if (action) {
          // Handle different actions here
          console.log('Action triggered:', action);
        }
      }, 1000);
    }
  };

  const ChatSuggestions = () => (
    <View style={styles.suggestionsContainer}>
      {['I need help', 'Feeling anxious', 'Want to meditate', 'Track my mood'].map((suggestion, index) => (
        <TouchableOpacity
          key={index}
          style={styles.suggestionButton}
          onPress={() => {
            setInputMessage(suggestion);
            sendMessage();
          }}
        >
          <LinearGradient
            colors={['#00BFFF', '#4169E1']}
            style={styles.suggestionGradient}
          >
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#00BFFF', '#4169E1']}
        style={styles.headerGradient}
      >
        <View style={styles.chatHeader}>
          <Text style={styles.headerTitle}>Chat with Us</Text>
        </View>
      </LinearGradient>

      <View style={styles.chatContainer}>
        <FlatList
          data={chatMessages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[
              styles.messageBubble,
              item.sender === 'user' ? styles.userMessage : styles.botMessage
            ]}>
              <Text style={[
                styles.messageText,
                item.sender === 'user' ? styles.userMessageText : styles.botMessageText
              ]}>
                {item.text}
              </Text>
            </View>
          )}
          style={styles.chatMessages}
        />

        <ChatSuggestions />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.chatInputContainer}
        >
          <TextInput
            style={styles.chatInput}
            placeholder="Type your message..."
            placeholderTextColor="#aaa"
            value={inputMessage}
            onChangeText={text => setInputMessage(text)}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={!inputMessage.trim()}
          >
            <LinearGradient
              colors={['#00BFFF', '#4169E1']}
              style={styles.sendButtonGradient}
            >
              <Feather
                name="arrow-right-circle"
                size={24}
                color="white"
              />
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerGradient: {
    width: '100%',
  },
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    padding: 15,
    alignItems: 'center',
     marginTop:30
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  chatMessages: {
    flex: 1,
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4169E1',
    borderTopRightRadius: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: 'white',
  },
  botMessageText: {
    color: '#333',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
  },
  suggestionButton: {
    margin: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  suggestionGradient: {
    padding: 8,
    borderRadius: 15,
  },
  suggestionText: {
    color: 'white',
    fontSize: 14,
  },
  chatInputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});