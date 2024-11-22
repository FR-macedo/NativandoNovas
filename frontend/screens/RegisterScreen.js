// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <View>
      <Text>Register</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
