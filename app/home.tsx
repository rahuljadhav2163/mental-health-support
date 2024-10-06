import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  DrawerLayoutAndroid, 
  Animated, 
  Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(0)).current;
  const drawerRef = useRef(null);

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

  const DrawerContent = () => (
    <View style={styles.drawerContent}>
      <Text style={styles.drawerTitle}>Menu</Text>
      {[
        { name: 'Profile', icon: 'user' },
        { name: 'Settings', icon: 'settings' },
        { name: 'About', icon: 'info' },
        { name: 'Help', icon: 'help-circle' },
        { name: 'Logout', icon: 'log-out' }
      ].map((item, index) => (
        <TouchableOpacity key={index} style={styles.drawerItem}>
          <Feather name={item.icon} size={24} color="#8B0000" style={styles.drawerItemIcon} />
          <Text style={styles.drawerItemText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const MainContent = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome,</Text>
        <Text style={styles.headerName}>Rahul</Text>
        <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
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
      <MainContent />
    </View>
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
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  drawerContent: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8B0000',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  drawerItemIcon: {
    marginRight: 15,
  },
  drawerItemText: {
    fontSize: 18,
    color: '#333',
  },
});

export default HomePage;