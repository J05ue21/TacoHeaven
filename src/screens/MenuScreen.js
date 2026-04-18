import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { menu } from '../data/menu'; // se llama a los datos para el contenido del menu disponible y mostrarlo con un FlatList

export default function MenuScreen({navigation}) {
  
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Detalle', { producto: item })}
    >
        <Image source={{ uri: item.imagen }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.precio}>${item.precio.toFixed(2)}</Text>
        <Text style={styles.categoria}>{item.categoria}</Text>
      </View>
    </TouchableOpacity>
  );
    return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f8f8f8' 
},
  list: { 
    padding: 10 
},
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    marginBottom: 15, 
    borderRadius: 10, 
    overflow: 'hidden',
    elevation: 3
  },

  image: { 
    width: 100,
    height: 100 
},
  info: { 
    padding: 10, 
    justifyContent: 'center' 
},
  nombre: { 
    fontSize: 18, 
    fontWeight: 'bold' 
},
  precio: { 
    fontSize: 16, 
    color: '#D32F2F', 
    marginVertical: 4 
},
  categoria: { 
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic'
}
});