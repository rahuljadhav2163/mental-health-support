import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';

export default function Appointment() {
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      education: 'MD - Harvard Medical School',
      experience: '15 years',
      rating: 4.8,
      totalReviews: 127,
      languages: ['English', 'Spanish'],
      availability: 'Mon, Wed, Fri',
      hospitalAffiliation: 'Mayo Clinic',
      certifications: ['American Board of Cardiology', 'Advanced Cardiac Life Support'],
      consultationFee: '200',
      expertise: ['Heart Disease', 'Hypertension', 'Cardiac Surgery'],
      phoneNumber: '7057461164',
      meetingLink: 'https://meet.google.com/vsb-ihyn-piu'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrician',
      education: 'MD - Stanford University',
      experience: '12 years',
      rating: 4.9,
      totalReviews: 189,
      languages: ['English', 'Mandarin'],
      availability: 'Mon-Fri',
      hospitalAffiliation: 'Children\'s Hospital',
      certifications: ['American Board of Pediatrics'],
      consultationFee: '150',
      expertise: ['Newborn Care', 'Pediatric Development', 'Vaccinations'],
      phoneNumber: '7057461164',
      meetingLink: 'https://meet.google.com/vsb-ihyn-piu' 
    }
  ];

  const handleVideoCall = async () => {
    try {
      const meetingLink = doctors[currentDoctorIndex].meetingLink;
      const supported = await Linking.canOpenURL(meetingLink);

      if (supported) {
        await Linking.openURL(meetingLink);
      } else {
        await WebBrowser.openBrowserAsync(meetingLink);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Unable to start video call. Please check your internet connection.',
        [
          { text: 'OK' },
          { 
            text: 'Try Phone Call', 
            onPress: handleCall 
          }
        ]
      );
    }
  };

  const handleCall = () => {
    const phoneNumber = doctors[currentDoctorIndex].phoneNumber;
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert('Error', 'Unable to make the call');
    });
  };

  const handlePrevious = () => {
    setCurrentDoctorIndex(prev => prev > 0 ? prev - 1 : doctors.length - 1);
  };

  const handleNext = () => {
    setCurrentDoctorIndex(prev => prev < doctors.length - 1 ? prev + 1 : 0);
  };

  const renderStars = (rating) => {
    const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    return stars;
  };

  return (
    <ScrollView style={styles.container}>
       <LinearGradient
        colors={['#4169E1', '#00BFFF']}
        style={styles.doctorCard}
      >
      <View style={styles.navigation}>
        <TouchableOpacity onPress={handlePrevious} style={styles.navButton}>
          <Text style={styles.navButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageIndicator}>{`${currentDoctorIndex + 1}/${doctors.length}`}</Text>
        <TouchableOpacity onPress={handleNext} style={styles.navButton}>
          <Text style={styles.navButtonText}>→</Text>
        </TouchableOpacity>
      </View>

     
        <View style={styles.header}>
          <Text style={[styles.doctorName, { color: '#fff' }]}>{doctors[currentDoctorIndex].name}</Text>
          <Text style={[styles.specialty, { color: '#fff' }]}>{doctors[currentDoctorIndex].specialty}</Text>
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.ratingText}>
            {renderStars(doctors[currentDoctorIndex].rating)}
          </Text>
          <Text style={[styles.rating, { color: '#fff' }]}>({doctors[currentDoctorIndex].rating})</Text>
          <Text style={[styles.reviews, { color: '#fff' }]}>{doctors[currentDoctorIndex].totalReviews} reviews</Text>
        </View>

        <View style={[styles.infoContainer, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: '#fff' }]}>Education</Text>
            <Text style={[styles.infoValue, { color: '#fff' }]}>{doctors[currentDoctorIndex].education}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: '#fff' }]}>Experience</Text>
            <Text style={[styles.infoValue, { color: '#fff' }]}>{doctors[currentDoctorIndex].experience}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: '#fff' }]}>Hospital</Text>
            <Text style={[styles.infoValue, { color: '#fff' }]}>{doctors[currentDoctorIndex].hospitalAffiliation}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: '#fff' }]}>Languages</Text>
            <Text style={[styles.infoValue, { color: '#fff' }]}>{doctors[currentDoctorIndex].languages.join(', ')}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: '#fff' }]}>Available</Text>
            <Text style={[styles.infoValue, { color: '#fff' }]}>{doctors[currentDoctorIndex].availability}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: '#fff' }]}>Fee</Text>
            <Text style={[styles.infoValue, { color: '#fff' }]}>₹{doctors[currentDoctorIndex].consultationFee}</Text>
          </View>
        </View>

        <View style={styles.expertiseSection}>
          <Text style={[styles.expertiseTitle, { color: '#fff' }]}>Expertise</Text>
          <View style={styles.expertiseTags}>
            {doctors[currentDoctorIndex].expertise.map((item, index) => (
              <View key={index} style={[styles.expertiseTag, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
                <Text style={[styles.expertiseTagText, { color: '#fff' }]}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.callButton, styles.videoCallButton]} 
            onPress={handleVideoCall}
          >
            <Text style={styles.callButtonText}>📹 Join Video Call</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.callButton, styles.phoneCallButton]} 
            onPress={handleCall}
          >
            <Text style={styles.callButtonText}>📞 Phone Call</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#4169E1',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 29,
    color: 'black',
  },
  pageIndicator: {
    fontSize: 16,
    color: '#fff',
  },
  doctorCard: {
    borderRadius: 15,
    margin: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  callButton: {
    backgroundColor: 'yellow',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  callButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoCallButton: {
    backgroundColor: 'white',
  },
  phoneCallButton: {
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 15,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  specialty: {
    fontSize: 16,
    fontWeight: '500',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    color: '#FFD700',
    marginRight: 5,
    fontSize: 18,
  },
  rating: {
    marginRight: 10,
  },
  reviews: {
    fontSize: 14,
  },
  infoContainer: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  expertiseSection: {
    marginBottom: 20,
  },
  expertiseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expertiseTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  expertiseTag: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    margin: 3,
  },
  expertiseTagText: {
    fontSize: 12,
  },
});