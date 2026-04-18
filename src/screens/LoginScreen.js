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

return (
    <View style={styles.container}>
      <Text style={styles.title}>TacoHeaven</Text>
      <TextInput 
        placeholder="Usuario" 
        onChangeText={setUser} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Contraseña" 
        secureTextEntry 
        onChangeText={setPassword} 
        style={styles.input} 
      />
      <Button title="Entrar" onPress={handleLogin} color="#D32F2F" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFBEB' 
},
  title: { 
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#D32F2F' 
},
  input: { 
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#FFF' 
}
});