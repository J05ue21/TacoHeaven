import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

//importando la biblioteca AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function OrderScreen({navigation}) {
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

      try {
        const historialPrevio = await AsyncStorage.getItem('historial');
        const historial = historialPrevio ? JSON.parse(historialPrevio) : [];
      
      // guarda la compra y fecha 
      const nuevaCompra = {
        id: Date.now().toString(),
        fecha: new Date().toLocaleString(),
        total: items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0),
        detalles: [...items]   //productos: items
      };
      
      // lo guarda en el historial (persistencia en AsyncStorage)
      historial.push(nuevaCompra);  
      await AsyncStorage.setItem('historial', JSON.stringify(historial));
      await AsyncStorage.removeItem('carrito');

      setItems([]); //limpia los datos actuales del carrito

      alert("¡Tu orden estará lista en unos minutos, gracias por preferir TacoHeaven!");
      //navigation.navigate('Menu');
      
      /* al cambiar de pantalla debe mostrarse el Menu con sl listado de platillos y bebidas*/
      navigation.navigate('Menu',{screen: 'ListaMenu'});

    }
    catch(error)
    {
      console.error("Hubo un problema al procesar la compra", error);
    }
  };

    return (
      <View style={styles.container}>
        <FlatList 
          data = {items}
          keyExtractor = {(item) => item.id}
          renderItem = {({ item }) => (
            <View style = {styles.itemRow}>
              <Text style = {styles.itemText}>{item.nombre} (x{item.cantidad})</Text>
              <Text style = {styles.itemPrice}>${(item.precio * item.cantidad).toFixed(2)}</Text>
            </View>
          )}
          ListEmptyComponent = {<Text style = {styles.empty}>Tu carrito está vacio</Text>}
          />

          <View style = {styles.footer}>
            <Text style={styles.totalLabel}>Total a pagar:</Text>
          <Text style={styles.totalAmount}>${calcularTotal().toFixed(2)}</Text>
          <Button 
            title="Confirmar Pedido" 
            onPress={finalizarCompra} 
            color="#4CAF50"
            disabled={items.length === 0}
          />
          </View>
        </View>
    );
  }


  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 20, 
      backgroundColor: '#fff' 
    },
    itemRow: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      paddingVertical: 10, 
      borderBottomWidth: 1, 
      borderColor: '#eee' 
    },
    itemText: { 
      fontSize: 16 
    },
    itemPrice: { 
      fontSize: 16, 
      fontWeight: 'bold' 
    },
    footer: { 
      marginTop: 20, 
      padding: 15, 
      backgroundColor: '#f9f9f9', 
      borderRadius: 10 
    },
    totalLabel: { 
      fontSize: 18, 
      color: '#666' 
    },
    totalAmount: { 
      fontSize: 28, 
      fontWeight: 'bold', 
      color: '#D32F2F', 
      marginBottom: 15 
    },
    empty: { 
      textAlign: 'center', 
      marginTop: 50, 
      fontSize: 18, 
      color: '#999' 
    }
  });