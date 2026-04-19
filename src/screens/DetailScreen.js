import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailScreen({ route, navigation }) {
  const { producto } = route.params; // Recibimos el producto del menú
  const [cantidad, setCantidad] = useState(1);

  const agregarAlCarrito = async() => {
  try {
    
    // ver que hay en el carrito
    const carritoActual = await AsyncStorage.getItem('carrito');
    let lista = carritoActual ? JSON.parse(carritoActual) : [];

    //los detalles  del platillo elegido, se guardan en nuevoItem
    const nuevoItem = {
      id: Date.now().toString(),  //pasa el objeto Date a un valor String
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: cantidad,
      imagen: producto.imagen
    };
    lista.push(nuevoItem);

    // lista actualizada
    await AsyncStorage.setItem('carrito', JSON.stringify(lista));
    
    alert("¡Producto añadido!");
    navigation.navigate('Orden'); // se salta a la pestaña Carrito
  } catch (e) {
    console.error("Hubo un problema al guardar", e);
  }
};

  //se muestra el detalle del platillo/bebida seleccionado del menu

  return (
    <View style={styles.container}>
      <Image source={{ uri: producto.imagen }} style={styles.image} />
      <Text style={styles.name}>{producto.nombre}</Text>
      <Text style={styles.price}>${producto.precio.toFixed(2)}</Text>
      
      <View style={styles.counter}>
        <Button title="-" onPress={() => setCantidad(Math.max(1, cantidad - 1))} />
        <Text style={styles.qty}>{cantidad}</Text>
        <Button title="+" onPress={() => setCantidad(cantidad + 1)} />
      </View>

      <Button title="Agregar a la Orden" onPress={agregarAlCarrito} color="#D32F2F" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20, 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  image: { 
    width: 250, 
    height: 250, 
    borderRadius: 15, 
    marginBottom: 20 
  },
  name: { 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  price: { 
    fontSize: 20, 
    color: '#D32F2F', 
    marginVertical: 10 
  },
  counter: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 20 
  },
  qty: { 
    fontSize: 20, 
    marginHorizontal: 20 
  }
});