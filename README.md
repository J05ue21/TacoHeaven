TacoHeaven es una aplicación multiplataforma desarrollada con **React Native** y **Expo** (SDK 54). Permite a los usuarios autenticarse, explorar un menú de platillos y bebidas, gestionar un carrito de compras y revisar su historial de pedidos con persistencia de datos local.
---

## 📽️ Demostración en Video
Puedes ver el funcionamiento detallado de la aplicación (vistas Web y móvil en Expo GO) y la explicación de su arquitectura en el siguiente enlace:
- Demostracion con Expo Go: https://udbedu-my.sharepoint.com/:v:/g/personal/oo172577_alumno_udb_edu_sv/IQDUiSy-OGNhTr0VnHTIcLwEATqCabNsc9dGd5KV8JSsEbo?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=VuEdjR
- Demostracion en vista Web, detalle de su funcionamiento y logica: https://udbedu-my.sharepoint.com/:v:/g/personal/oo172577_alumno_udb_edu_sv/IQAJy62eXJneRoW4OSmwkH07ARO8bOm8h70eja1emB61ozY?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=6EWUqU
- ---

## Tecnologías y Librerías (Dependencias)
Este proyecto utiliza el **SDK 54 de Expo** y las siguientes bibliotecas clave:

- **Navegación:** `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`.
- **Persistencia de Datos:** `@react-native-async-storage/async-storage` (para almacenar el carrito e historial).
- **Iconografía:** `@expo/vector-icons` (Ionicons).
- **Interfaz:** Componentes nativos de `react-native` (FlatList, KeyboardAvoidingView, Platform, etc.).

---

## Guía de Ejecución

Para ejecutar este proyecto en una máquina local, sigue estos pasos:

### Requisitos Previos
- Tener instalado [Node.js](https://nodejs.org/).
- Tener instalado el CLI de Expo: `npm install -g expo-cli`.
- (Opcional) App **Expo GO** instalada en tu dispositivo Android o iOS.

### Instalación
Clona este repositorio y navega a la carpeta del proyecto:
  git clone https://github.com/J05ue21/TacoHeaven.git
  cd TacoHeaven

## Instala las dependencias necesarias:
  npm install

## Inicia Expo:
  npx expo start
