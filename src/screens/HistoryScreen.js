import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function HistoryScreen() {
  const [historial, setHistorial] = useState([]);
  const isFocused = useIsFocused();

  // cargar los datos desde el almacenamiento
  const cargarHistorial = async () => {
    try {
      const datos = await AsyncStorage.getItem('historial');
      if (datos) {
        // se muestra la compra mas reciente primero
        const lista = JSON.parse(datos).reverse();
        setHistorial(lista);
      }
    } catch (e) {
      console.error("Error al cargar historial", e);
    }
  };

  // si se desea borra el historial
  const borrarHistorial = () => {
    const mensaje = "¿Estás seguro de que deseas borrar todo el historial de compras?";
      //Vista WEB
      if(Platform.OS === 'web')
      {
        if(window.confirm(mensaje)){
        ejecutarLimpieza();
      }
      else{ //vista desde el movil
          Alert.alert(
            "Limpiar Reporte",
            mensaje,
            [
              { text: "Cancelar", style: "cancel" },
              { text: "Borrar", style: "destructive", onPress: ejecutarLimpieza}
            ]
          );
      }
    }
};

// funcion especifica para eliminar en ambas plataformas
const ejecutarLimpieza = async () => {
  try {
    await AsyncStorage.removeItem('historial');
    setHistorial([]);
    if (Platform.OS === 'web') alert("Historial eliminado");
  } 
  catch (e) 
  {
    console.error("Error al limpiar", e);
  }
};

  useEffect(() => {
    if (isFocused) {
      cargarHistorial();
    }
  }, [isFocused]);

  const renderCompra = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.fechaText}>{item.fecha}</Text>
        <Text style={styles.idText}>ID: #{item.id.slice(-6)}</Text>
      </View>
      
      <View style={styles.divider} />
      
      {item.detalles && Array.isArray(item.detalles) ? (
      item.detalles.map((prod, index) => (
        <View key={index} style={styles.productoRow}>
          <Text style={styles.productoText}>
            {prod.cantidad}x {prod.nombre}
          </Text>
          <Text style={styles.subtotalText}>
            ${(prod.precio * prod.cantidad).toFixed(2)}
          </Text>
        </View>
      ))
    ) : (
      <Text style={{ color: '#999', fontStyle: 'italic' }}>Sin detalles disponibles</Text>
    )}
      <View style={styles.divider} />
      
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Pagado:</Text>
        <Text style={styles.totalValue}>${item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reporte de Compras</Text>
        {historial.length > 0 && (
          <TouchableOpacity onPress={borrarHistorial}>
            <Text style={styles.clearText}>Limpiar</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={historial}
        keyExtractor={(item) => item.id}
        renderItem={renderCompra}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aún no has realizado ninguna compra.</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F9', padding: 15 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20,
    marginTop: 10 
  },
  title: { 
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333' 
  },
  clearText: { 
    color: '#D32F2F', 
    fontWeight: 'bold' 
  },
  listContent: { 
    paddingBottom: 20 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 15,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50' // Color verde para indicar éxito
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 5 
  },
  fechaText: { 
    fontSize: 14, 
    color: '#666', 
    fontWeight: '600' 
  },
  idText: { 
    fontSize: 12,
    color: '#999' 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#EEE',
    marginVertical: 10 
  },
  productoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: 5 
  },
  productoText: { 
    fontSize: 15, color: '#444'
  },
  subtotalText: {
    fontSize: 15, color: '#444' 
  },
  totalRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 5 
  },
  totalLabel: { 
    fontSize: 16,
    fontWeight: 'bold', 
    color: '#333' 
  },
  totalValue: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#D32F2F' 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 50,
    color: '#999', 
    fontSize: 16
  }
});