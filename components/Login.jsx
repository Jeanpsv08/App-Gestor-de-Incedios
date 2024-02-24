import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as data from "./data.json";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = data.data.find(
      (user) => user.correo === username && user.contraseña === password
    );
    if (user) {
      // Usuario autenticado correctamente
      // Muestra un mensaje de bienvenida en un Alert
      Alert.alert("Bienvenido", `¡Hola ${user.nombre}!`);
      // Navega a la pantalla de Dashboard
      setUsername('');
      setPassword('');   
      navigation.navigate("Dashboard");
         
    } else {
      // Usuario no encontrado o contraseña incorrecta
      setError("Usuario o contraseña incorrectos");
      // Limpia el mensaje de error después de 3 segundos
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleCreateUser = () => {
    // Redirige a la pantalla de Crear Usuario
    navigation.navigate("NewUser");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateUser}>
        <Text style={styles.text}>
          ¿No tiene una cuenta? <Text style={styles.link}>Cree una.</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#0c2c52", // Fondo azul oscuro similar al de Home
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff", // Texto blanco similar al de Home
  },
  error: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20, // Aumentado el margen inferior para separar los campos
    backgroundColor: "#ffffff", // Fondo blanco similar al de Home
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0c2c52", // Texto azul oscuro similar al de Home
  },
  link: {
    fontSize: 16,
    color: "lightblue",
  },
  text: {
    fontSize: 16,
    color: "#ffffff",
  },
});

export default Login;
