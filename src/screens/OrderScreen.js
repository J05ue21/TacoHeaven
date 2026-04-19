import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderScreen() {
  return (
    <View style={styles.container}>
      <Text>Pantalla para mostrar Orden</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
}
});