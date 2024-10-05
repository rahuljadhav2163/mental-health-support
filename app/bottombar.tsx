// BottomBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabButton = ({ name, label, isActive, onPress }) => (
  <TouchableOpacity style={styles.tab} onPress={onPress}>
    <MaterialCommunityIcons
      name={name}
      size={24}
      color={isActive ? 'red' : '#757575'}
    />
    <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const BottomBar = ({ activeTab, setActiveTab }) => (
  <View style={styles.bottomBar}>
    <TabButton
      name="home"
      label="Home"
      isActive={activeTab === 'Home'}
      onPress={() => setActiveTab('Home')}
    />
    <TabButton
      name="help-circle"
      label="Help"
      isActive={activeTab === 'Help'}
      onPress={() => setActiveTab('Help')}
    />
    <TabButton
      name="account"
      label="Profile"
      isActive={activeTab === 'Profile'}
      onPress={() => setActiveTab('Profile')}
    />
  </View>
);

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  tabLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  activeTabLabel: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default BottomBar;
