import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    // con variables locales se almacenan las credenciales
    const VALID_USER = 'josue26';
    const VALID_PASS = 'exporeact';

    if (user === VALID_USER && password === VALID_PASS) {
      navigation.replace('Main'); // con replace se evita que el usuario "regrese" al login
    } 
    else 
    {
      const mensajeError = 'Usuario o contraseña incorrectos';
      if (Platform.OS === 'web') {
        alert(mensajeError);
      } 
      else {
      Alert.alert('Error', mensajeError);
      }
    }
  };

return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={styles.container} 
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://cdn.creativefabrica.com/2021/03/10/Food-Taco-Cloud-Style-Graphics-9428700-2-580x387.png' }} 
            style={styles.logo}
          />
          <Text style={styles.brandName}>TACO HEAVEN</Text>
          <Text style={styles.tagline}>El paraíso del sabor</Text>
        </View>
        <TextInput 
          placeholder="Usuario" 
          onChangeText={setUser} 
          style={styles.input}
        />
        <TextInput 
          placeholder="Contraseña" 
          secureTextEntry={true} 
          onChangeText={setPassword} 
          style={styles.input}
        />
        <Button 
          title="Entrar" 
          onPress={handleLogin} 
          color="#D32F2F"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20, 
},

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D32F2F', // Rojo institucional
    marginTop: 10,
  },

  tagline: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },

  input: { 
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15, 
},
  button: {
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});