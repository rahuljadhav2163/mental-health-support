import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View>
            <Text style={styles.title}>Mental Health Care</Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Create Your</Text>
            <Text style={styles.headerText}>Account</Text>
            <TouchableOpacity style={styles.menuButton}>
              <Feather name="more-horizontal" size={24} color="white" />
            </TouchableOpacity>
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
              <Text style={styles.label}>Phone or Gmail</Text>
              <TextInput 
                style={styles.input}
                placeholder="Joydee@gmail.com"
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
                  <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#888" />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput 
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor="#888"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={24} color="#888" />
                </TouchableOpacity>
              </View>
            </View>
            
            <TouchableOpacity style={styles.signUpButton}>
              <Text style={styles.signUpText}>SIGN UP</Text>
            </TouchableOpacity>
            
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account?</Text>
              <TouchableOpacity>
                <Text style={styles.signInLink}> <Link href="/login">
                    SIGN IN
                    </Link></Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'yellow',
    marginTop:0,
    padding:20
  }, 
  container: {
    flex: 1,
    backgroundColor: '#8B0000',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    top: -45,
    right: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#8B0000',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  checkIcon: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  signUpButton: {
    backgroundColor: '#8B0000',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#333',
  },
  signInLink: {
    color: '#8B0000',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Signup;
