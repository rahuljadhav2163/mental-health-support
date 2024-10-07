import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LinearGradient colors={['#00BFFF', '#4169E1']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          
          <Text style={styles.title}>TogetherWeHeal</Text>
          <Text style={styles.headerText}>Welcome Back</Text>
          <Text style={styles.subHeaderText}>Sign in to continue</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input}
              placeholder="health@example.com"
              placeholderTextColor="#888"
              keyboardType="email-address"
            />
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
          
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>
          
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.signUpLink}>
                <Link href="/signup">SIGN UP</Link>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    color: '#333',
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
  forgotPassword: {
    color: '#4169E1',
    textAlign: 'right',
    marginTop: 15,
    marginBottom: 30,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#4169E1',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  signInText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  signUpText: {
    color: '#333',
    fontSize: 16,
  },
  signUpLink: {
    color: '#4169E1',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default Login;