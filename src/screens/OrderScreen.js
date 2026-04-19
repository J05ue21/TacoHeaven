import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

//importando la biblioteca AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function OrderScreen() {
  const [items, setItems] = useState([]);
  const isFocused = useIsFocused(); // actualizar al entrar a esta pestaña

  const cargarCarrito = async () => {
    const guardado = await AsyncStorage.getItem('carrito');
    setItems(guardado ? JSON.parse(guardado) : []); //de json a objeto
  };

  useEffect(() => {
    if (isFocused) cargarCarrito();
  }, [isFocused]);

  const calcularTotal = () => {
    return items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const finalizarCompra = async () => {
    if (items.length === 0) return;

    const historialPrevio = await AsyncStorage.getItem('historial');
    const historial = historialPrevio ? JSON.parse(historialPrevio) : [];

    // guarda la compra y fecha 
    const nuevaCompra = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString(),
      total: calcularTotal(),
      productos: items
    };
    historial.push(nuevaCompra);

    // lo guarda en el historial (persistencia en AsyncStorage)
    await AsyncStorage.setItem('historial', JSON.stringify(historial));
    await AsyncStorage.removeItem('carrito');
    setItems([]);
    alert("¡Gracias por preferir TacoHeaven!");
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre} x{item.cantidad}</Text>
            <Text>${(item.precio * item.cantidad).toFixed(2)}</Text>
          </View>
        )}
        />
      <Text style={styles.total}>Total: ${calcularTotal().toFixed(2)}</Text>
      <Button title="Confirmar Pedido" onPress={finalizarCompra} color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  item: { 
    flexDirection: 'row',
    justifyContent: 'space-between', 
    padding: 10, 
    borderBottomWidth: 1 
  },
  total: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'right', 
    marginVertical: 20 
  }
});