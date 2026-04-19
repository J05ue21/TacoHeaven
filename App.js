import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
      
      <Stack.Screen name="Detalle" component={DetailScreen} options={{ title: 'Configurar Orden' }} />
    </MenuStack.Navigator>
  );
}

//menu tipo tab (pestañas) mostrados tras pasar login
function MainTabs(){
  return (
    <Tab.Navigator screenOptions={{ headerShown: false}}>
      <Tab.Screen name="Menu" component={MenuStackScreen} options={{ title: 'Nuestro Menú' }} />
      <Tab.Screen name="Orden" component={OrderScreen} options={{ title: 'Mi carrito' }} />
      <Tab.Screen name="Historial" component={HistoryScreen} options={{ title: 'Historial de Pedidos' }} />
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

