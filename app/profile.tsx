import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

function Profile() {
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
          
          <TouchableOpacity style={styles.signInButton}>
            <Link href="/login" style={styles.signInText}>
              LOGIN
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpText}>
              <Link href="/signup">
                SIGN UP
              </Link>
            </Text>
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
});

export default Profile;