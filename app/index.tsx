
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import BottomBar from './bottombar';
import Help from './help';
import Profile from './profile';
import Home from './home';

export default function Index() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <SafeAreaView style={styles.containers}>
      <View style={styles.content}>
        {activeTab === 'Home' && <Home />}
        {activeTab === 'Help' && <Help />}
        {activeTab === 'Profile' && <Profile />}
      </View>
      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
  },
});
