import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
const Login = () => {
   
  return (
    <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.title}>Mental Health Care</Text>
        </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello</Text>
        <Text style={styles.headerText}>Sign in!</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="more-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gmail</Text>
          <TextInput 
            style={styles.input}
            placeholder="health@gmail.com"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#888"
              secureTextEntry
            />
            <TouchableOpacity>
              <Feather name="eye-off" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>SIGN IN</Text>
        </TouchableOpacity>
        
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have account?</Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}> 
                <Link href="/signup">
                SIGN UP
                </Link>
                </Text>
          </TouchableOpacity>
        </View>
        
      </View>
      
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
    containers: {
        flex: 1,
        backgroundColor: '#f0f0f0',
      },
      content: {
        flex: 1,
      },
  container: {
    flex: 1,
    backgroundColor: '#8B0000',
  },
  header: {
    padding: 20,
    paddingTop: 30,
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
    color: '#333',
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
  forgotPassword: {
    color: '#8B0000',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#8B0000',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#333',
  },
  signUpLink: {
    color: '#8B0000',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Login;