import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as data from './data.json'; // Importa el archivo data.json
import * as FileSystem from 'expo-file-system';

const NewUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleAddUser = async () => {
    // Verifica si el usuario ya existe
    const existingUser = data.data.find(user => user.correo === username);
    if (existingUser) {
      // Si el usuario ya existe, muestra un mensaje de error
      Alert.alert('Error', 'El nombre de usuario ya está en uso.');
    } else {
      // Si el usuario no existe, añade el nuevo usuario
      const newUser = {
        nombre: name,
        correo: username,
        contraseña: password
      };
      // Añade el nuevo usuario al array de usuarios
      data.data.push(newUser);
      // Guarda el contenido actualizado en el archivo data.json
      try {
        const jsonContent = JSON.stringify(data, null, 2);
        await FileSystem.writeAsStringAsync(FileSystem.cacheDirectory + 'data.json', jsonContent);
        Alert.alert(
          'Usuario Creado',
          '¡El usuario ha sido creado correctamente!',
          [{ text: 'Aceptar', onPress: () => navigation.navigate('Login') }],
          { cancelable: false }
        );
        // Limpia los campos después de añadir el usuario
        setUsername('');
        setPassword('');
        setName('');
      } catch (error) {
        console.error('Error al guardar el archivo:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir Nuevo Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Añadir Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#0c2c52', // Fondo azul oscuro similar al de Home
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // Texto blanco similar al de Home
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20, // Aumentado el margen inferior para separar los campos
    backgroundColor: '#ffffff', // Fondo blanco similar al de Home
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c2c52', // Texto azul oscuro similar al de Home
  },
});

export default NewUser;
