import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
function Profile() {
  return (
    <LinearGradient
      colors={['#FF0844', '#4A0E2E', '#1A0010']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="dots-horizontal" size={24} color="white" />
        </View>
                                              
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="brain" size={60} color="white" />
            <Text style={styles.logoText}>Mental Health Care</Text>
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
          <Text style={styles.socialText}>Login with Social Media</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="instagram" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="twitter" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="facebook" size={24} color="white" />
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
    alignItems: 'flex-end',
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
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  welcomeText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  signInButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: width - 80,
    alignItems: 'center',
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signUpText: {
    color: '#FF0844',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialText: {
    color: 'white',
    marginBottom: 20,
    fontSize: 16,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
});

export default Profile;
