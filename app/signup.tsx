import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <LinearGradient colors={['#00BFFF', '#4169E1']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.header}>
             
              <Text style={styles.title}>TogetherWeHeal</Text>
              <Text style={styles.headerText}>Create Your Account</Text>
              <Text style={styles.subHeaderText}>Sign up to get started</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="John Smith"
                  placeholderTextColor="#888"
                />
                <Feather name="check" size={24} color="#4CAF50" style={styles.checkIcon} />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="john@example.com"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                />
                <Feather name="check" size={24} color="#4CAF50" style={styles.checkIcon} />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput 
                    style={styles.passwordInput}
                    placeholder="••••••••"
                    placeholderTextColor="#888"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#4169E1" />
                  </TouchableOpacity>
                </View>
              </View>
              
             
              
              
              <TouchableOpacity style={styles.signUpButton}>
                <Text style={styles.signUpText}>SIGN UP</Text>
              </TouchableOpacity>
              
              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an account?</Text>
                <TouchableOpacity>
                  <Text style={styles.signInLink}>
                    <Link href="/login">SIGN IN</Link>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    padding: 20,
    paddingTop: 40,
  },
  menuButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: 'white',
    fontSize: 18,
    opacity: 0.8,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingTop: 40,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    color: '#4169E1',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#4169E1',
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#4169E1',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  checkIcon: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  signUpButton: {
    backgroundColor: '#4169E1',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  signInText: {
    color: '#333',
    fontSize: 16,
  },
  signInLink: {
    color: '#4169E1',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default Signup;