import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    soundEffects: true,
    privacyMode: true,
    dataSync: false,
    emailUpdates: true,
    moodTracking: true,
    meditation: false
  });

  const SettingItem = ({ title, description, value, onValueChange }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={Platform.OS === 'ios' ? '#fff' : value ? '#4a90e2' : '#f4f3f4'}
      />
    </View>
  );

  const SettingSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your app experience</Text>
      </View>

      <SettingSection title="Notifications & Privacy">
        <SettingItem
          title="Push Notifications"
          description="Receive important updates and reminders"
          value={settings.notifications}
          onValueChange={(value) => 
            setSettings(prev => ({ ...prev, notifications: value }))
          }
        />
        <SettingItem
          title="Privacy Mode"
          description="Hide sensitive information when app is in background"
          value={settings.privacyMode}
          onValueChange={(value) =>
            setSettings(prev => ({ ...prev, privacyMode: value }))
          }
        />
      </SettingSection>

      <SettingSection title="App Preferences">
        <SettingItem
          title="Dark Mode"
          description="Switch to dark theme"
          value={settings.darkMode}
          onValueChange={(value) =>
            setSettings(prev => ({ ...prev, darkMode: value }))
          }
        />
        <SettingItem
          title="Sound Effects"
          description="Play sounds during meditation and exercises"
          value={settings.soundEffects}
          onValueChange={(value) =>
            setSettings(prev => ({ ...prev, soundEffects: value }))
          }
        />
      </SettingSection>

      <SettingSection title="Features">
        <SettingItem
          title="Mood Tracking"
          description="Track your daily mood patterns"
          value={settings.moodTracking}
          onValueChange={(value) =>
            setSettings(prev => ({ ...prev, moodTracking: value }))
          }
        />
        <SettingItem
          title="Meditation Timer"
          description="Enable meditation session timing"
          value={settings.meditation}
          onValueChange={(value) =>
            setSettings(prev => ({ ...prev, meditation: value }))
          }
        />
      </SettingSection>

      <SettingSection title="Data & Sync">
        <SettingItem
          title="Auto Sync"
          description="Automatically sync your data across devices"
          value={settings.dataSync}
          onValueChange={(value) =>
            setSettings(prev => ({ ...prev, dataSync: value }))
          }
        />
        <SettingItem
          title="Email Updates"
          description="Receive weekly progress reports"
          value={settings.emailUpdates}
          onValueChange={(value) =>
            setSettings(prev => ({ ...prev, emailUpdates: value }))
          }
        />
      </SettingSection>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  sectionContent: {
    paddingHorizontal: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  settingTitle: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
 
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      padding: 20,
      backgroundColor: '#00B2FF', // Changed to match the top gradient color
      borderBottomWidth: 0, // Removed border to match design
      borderBottomColor: 'transparent',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff', // Changed to white to match design
    },
    headerSubtitle: {
      fontSize: 14,
      color: '#fff', // Changed to white to match design
      marginTop: 5,
    },
    section: {
      marginTop: 20,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#e1e1e1',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#0099FF', // Changed to match the app's blue
      padding: 15,
      backgroundColor: '#f8f8f8',
    },
   
    logoutButton: {
      margin: 20,
      padding: 15,
      backgroundColor: '#0099FF', // Changed to match the app's blue instead of red
      borderRadius: 8,
      alignItems: 'center',
    }
  
});