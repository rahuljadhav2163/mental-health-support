import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function Appointment() {
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  return (
    <View>
      <Text>Doctor's Name:</Text>
      <TextInput value={doctorName} onChangeText={setDoctorName} />

      <Text>Patient's Name:</Text>
      <TextInput value={patientName} onChangeText={setPatientName} />

      <Text>Date:</Text>
      <TextInput value={date} onChangeText={setDate} />

      <Text>Time:</Text>
      <TextInput value={time} onChangeText={setTime} />

      <Button title="Book Appointment"  />
    </View>
  );
}
