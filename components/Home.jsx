import React from 'react';
import { StatusBar, Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escuela Politécnica Nacional</Text>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Facultad de Ingeniería Eléctrica y Electrónica</Text>
        <Image
          source={{ uri: 'https://seeklogo.com/images/E/epn-logo-2E1980F141-seeklogo.com.gif' }}
          style={styles.logo}
        />
        <Text style={styles.subtitle}>Sistemas IoT</Text>
        <Text style={styles.subtitle}>Sistema Detector de Incendios</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c2c52', // Fondo azul oscuro
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#ffffff',
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c2c52',
  },
});

export default Home;
