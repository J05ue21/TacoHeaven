import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    // con variables locales se almacenan las credenciales
    const VALID_USER = 'josue26';
    const VALID_PASS = 'expoyreact';

    if (user === VALID_USER && password === VALID_PASS) {
      navigation.replace('Main'); // con replace se evita que el usuario "regrese" al login
    } 
    else 
    {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };