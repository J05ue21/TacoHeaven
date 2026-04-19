import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';  //iconos para tab navigator

// incluyendo las pantallas basicas de la app
import LoginScreen from './src/screens/LoginScreen';
import MenuScreen from './src/screens/MenuScreen';
import OrderScreen from './src/screens/OrderScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MenuStack = createNativeStackNavigator();

//navegacion de tipo Stack
function MenuStackScreen(){
  return(
    <MenuStack.Navigator>
      <Stack.Screen name="ListaMenu" component={MenuScreen} options={{ title: 'Menú TacoHeaven' }} />
      
      <Stack.Screen name="Detalle" component={DetailScreen} options={{ title: 'Ajusta la orden' }} />
    </MenuStack.Navigator>
  );
}

//menu tipo tab (pestañas) mostrados tras pasar login
function MainTabs(){
  return (
    
    <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      // iconos según la ruta
      if (route.name === 'Menu') {
        iconName = focused ? 'restaurant' : 'restaurant-outline';
      } else if (route.name === 'Orden') {
        iconName = focused ? 'cart' : 'cart-outline';
      } else if (route.name === 'Historial') {
        iconName = focused ? 'clipboard' : 'clipboard-outline';
      }

      // Retorna el componente Ionicons con el nombre asignado
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#D32F2F',
    tabBarInactiveTintColor: 'gray',
    headerShown: false, 
  })}
>
  <Tab.Screen 
    name="Menu" 
    component={MenuStackScreen} 
    options={{ title: 'Nuestro Menú' }} 
  />
  <Tab.Screen 
    name="Orden" 
    component={OrderScreen} 
    options={{ title: 'Mi Carrito' }} 
  />
  <Tab.Screen 
    name="Historial" 
    component={HistoryScreen} 
    options={{ title: 'Reporte de Compras' }} 
  />
</Tab.Navigator>

  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

