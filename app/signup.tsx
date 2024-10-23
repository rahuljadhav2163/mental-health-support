import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!mobileRegex.test(mobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveToSecureStore = async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, JSON.stringify(value)); 
    } catch (error) {
      console.error('Error saving to SecureStore', error);
    }
  };

  const handleRegister = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch('https://mental-health-support-backend.vercel.app/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({fullName, mobile, password }),
        });

        const data = await response.json();
        if (response.ok) {
          Alert.alert('Success', 'Registration successful!');
          const userData = { fullName, mobile };
          await saveToSecureStore('userData', userData);
          router.replace('/')          
        } else {
          Alert.alert('Error', data.message || 'Registration failed');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

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
                  value={fullName}
                  onChangeText={setFullName}
                />
                {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                <Feather name="check" size={24} color={fullName.trim() ? "#4CAF50" : "#888"} style={styles.checkIcon} />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile No</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="+91 0000000000"
                  placeholderTextColor="#888"
                  value={mobile}
                  onChangeText={setMobile}
                  keyboardType="phone-pad"
                />
                {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
                <Feather name="check" size={24} color={mobile.length === 10 ? "#4CAF50" : "#888"} style={styles.checkIcon} />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput 
                    style={styles.passwordInput}
                    placeholder="••••••••"
                    placeholderTextColor="#888"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#4169E1" />
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              {/* Show Activity Indicator when loading */}
              {loading ? (
                <ActivityIndicator size="large" color="#4169E1" style={styles.loadingIndicator} />
              ) : (
                <TouchableOpacity 
                  style={[styles.signUpButton, loading && { opacity: 0.7 }]} 
                  onPress={handleRegister} 
                  disabled={loading} // Disable button when loading
                >
                  <Text style={styles.signUpText}>SIGN UP</Text>
                </TouchableOpacity>
              )}
              
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
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
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