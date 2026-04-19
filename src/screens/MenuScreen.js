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
        <View style={styles.labelCategoria}>
          <Text style={styles.categoriaText}>{item.categoria}</Text>
        </View>
        <Text style={styles.precio}>${item.precio.toFixed(2)}</Text>
        
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
    backgroundColor: '#f8f8f8',
  },
  list: {
    padding: 15,
    paddingBottom: 20,
  },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    marginBottom: 15, 
    borderRadius: 15, // Más redondeado
    overflow: 'hidden',
    elevation: 4, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    marginHorizontal: 5,
  },

  image: { 
    width: 110,
    height: 110 
},
  info: { 
    padding: 12, 
    flex: 1, 
    justifyContent: 'center' 
},
  nombre: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
},
  labelCategoria: { // Pequeña etiqueta para la categoría
    backgroundColor: '#FFFBEB',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#FEF3C7'
  },
  categoriaText: {
    fontSize: 12,
    color: '#B45309',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  precio: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#D32F2F', 
    marginTop: 8 
  },
});