import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userDataString = await SecureStore.getItemAsync('userData');
      const isLoggedIn = await SecureStore.getItemAsync('isLoggedIn');
      
      if (isLoggedIn === 'true' && userDataString) {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Log out',
          onPress: async () => {
            try {
              await SecureStore.deleteItemAsync('userData'); 
              await SecureStore.deleteItemAsync('isLoggedIn'); 
              setUserData(null);
              Alert.alert('Success', 'Logged out successfully');
            } catch (error) {
              console.error('Error logging out:', error);
              Alert.alert('Error', 'Failed to log out');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4169E1" />
      </View>
    );
  }

  if (userData) {
    return (
      <LinearGradient
        colors={['#00BFFF', '#4169E1']}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <MaterialCommunityIcons name="account-circle" size={100} color="white" />
              </View>
              <Text style={styles.profileName}>{userData.fullName}</Text>
              <Text style={styles.profileInfo}>{userData.mobile}</Text>
            </View>

            <View style={styles.profileActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push("/")}
              >
                <MaterialCommunityIcons name="account-edit" size={24} color="#4169E1" />
                <Text style={styles.actionButtonText}>Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push("/")}
              >
                <MaterialCommunityIcons name="cog" size={24} color="#4169E1" />
                <Text style={styles.actionButtonText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.logoutButton]}
                onPress={handleLogout}
              >
                <MaterialCommunityIcons name="logout" size={24} color="#FF4444" />
                <Text style={[styles.actionButtonText, styles.logoutText]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#00BFFF', '#4169E1']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="brain" size={80} color="white" />
            <Text style={styles.logoText}>TogetherWeHeal</Text>
          </View>
          
          <Text style={styles.welcomeText}>Welcome Back</Text>
          
          <TouchableOpacity style={styles.signInButton} onPress={() => router.push("/login")}>
            <Text style={styles.signInText}>LOGIN</Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.signUpButton} onPress={() => router.push("/signup")}>
            <Text style={styles.signUpText}>SIGN UP</Text>
          </TouchableOpacity>
    
          <Text style={styles.socialText}>Or connect with</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="google" size={24} color="#4169E1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="apple" size={24} color="#4169E1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="facebook" size={24} color="#4169E1" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-start',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5
  },
  welcomeText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5
  },
  signInButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: width - 80,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  signInText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: width - 80,
    alignItems: 'center',
    marginBottom: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  signUpText: {
    color: '#4169E1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialText: {
    color: 'white',
    marginBottom: 20,
    fontSize: 16,
    opacity: 0.8,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  profileName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  profileInfo: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  profileActions: {
    width: width - 80,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#4169E1',
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  logoutText: {
    color: '#FF4444',
  },
  // Include all existing styles from the original component...
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5
  },
  welcomeText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5
  },
  signInButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: width - 80,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  signInText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: width - 80,
    alignItems: 'center',
    marginBottom: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  signUpText: {
    color: '#4169E1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialText: {
    color: 'white',
    marginBottom: 20,
    fontSize: 16,
    opacity: 0.8,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
});

export default Profile;