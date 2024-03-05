import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Dashboard = ({ navigation }) => {
    const [smokeLevel1, setSmokeLevel1] = useState(0);
    const [temperature1, setTemperature1] = useState(0);
    const [smokeLevel2, setSmokeLevel2] = useState(0);
    const [temperature2, setTemperature2] = useState(0);
    const [smokeLevel3, setSmokeLevel3] = useState(0);
    const [temperature3, setTemperature3] = useState(0);
    const [isMounted, setIsMounted] = useState(true);

    // Configura la URL de la API y el token de autorización
    const url = 'https://backend.thinger.io/v3/users/Grupo3IoT/devices/Esp32/resources/DataSensors';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDk2NjE4NDcsImlhdCI6MTcwOTY1NDY0Nywicm9sZSI6InVzZXIiLCJ1c3IiOiJHcnVwbzNJb1QifQ.KQcFejXNmOHcsuvECvc_hFD53RO_hPyEdFgoPOcvTDU';



    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const response = await axios.get(url, config);
                console.log('Respuesta de la API:', response.data);
                if (isMounted) { // Verificar si el componente está montado antes de actualizar el estado
                    setSmokeLevel1(response.data.Humo1);
                    setTemperature1(parseFloat(response.data.Temperatura1).toFixed(2));
                    setSmokeLevel2(response.data.Humo2);
                    setTemperature2(parseFloat(response.data.Temperatura2).toFixed(2));
                    setSmokeLevel3(response.data.Humo3);
                    setTemperature3(parseFloat(response.data.Temperatura3).toFixed(2));
                }
            } catch (error) {
                console.error('Error al hacer la solicitud:', error);
            }
        };

        const interval = setInterval(fetchData, 2000);

        return () => clearInterval(interval);
    }, []);


/*    useEffect(() => {
        const interval = setInterval(() => {
            const randomSmokeLevel = Math.floor(Math.random() * 101);
            const randomTemperature = Math.floor(Math.random() * 51) + 20;
            setSmokeLevel2(randomSmokeLevel);
            setTemperature2(randomTemperature);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomSmokeLevel = Math.floor(Math.random() * 101);
            const randomTemperature = Math.floor(Math.random() * 51) + 20;
            setSmokeLevel3(randomSmokeLevel);
            setTemperature3(randomTemperature);
        }, 5000);

        return () => clearInterval(interval);
    }, []);
*/
    useEffect(() => {
        const removeListener = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            Alert.alert(
                'Cerrar sesión',
                '¿Desea cerrar sesión?',
                [
                    {
                        text: 'No',
                        style: 'cancel',
                    },
                    {
                        text: 'Sí',
                        onPress: () => {
                            
                            removeListener();
                            navigation.navigate('Login');
                        },
                    },
                ],
                { cancelable: false }
            );
        });

        // Retornar la función de limpieza del oyente
        return removeListener;
    }, [navigation]); // Asegúrate de incluir 'navigation' como una dependencia del efecto.


    const getMessage = (smokeLevel, temperature) => {
        if (smokeLevel >= 470) {
            return '¡Peligro! Altos niveles de humo y temperatura';
        } else if (smokeLevel >= 400 && smokeLevel < 470) {
            return '¡Alerta! Alto nivel de humo';
        } else {
            return 'Todo en orden';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Zona 1</Text>
                <View style={styles.box}>
                    <Text style={styles.text}>Nivel de Humo:</Text>
                    <Text style={styles.text}>{smokeLevel1}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Temperatura:</Text>
                    <Text style={styles.text}>{temperature1} °C</Text>
                </View>
                <View style={[styles.messageBox, { backgroundColor: getMessageBackgroundColor(smokeLevel1, temperature1) }]}>
                    <Text>{getMessage(smokeLevel1, temperature1)}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Zona 2</Text>
                <View style={styles.box}>
                    <Text style={styles.text}>Nivel de Humo:</Text>
                    <Text style={styles.text}>{smokeLevel2}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Temperatura:</Text>
                    <Text style={styles.text}>{temperature2} °C</Text>
                </View>
                <View style={[styles.messageBox, { backgroundColor: getMessageBackgroundColor(smokeLevel2, temperature2) }]}>
                    <Text>{getMessage(smokeLevel2, temperature2)}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Zona 3</Text>
                <View style={styles.box}>
                    <Text style={styles.text}>Nivel de Humo:</Text>
                    <Text style={styles.text}>{smokeLevel3}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}>Temperatura:</Text>
                    <Text style={styles.text}>{temperature3} °C</Text>
                </View>
                <View style={[styles.messageBox, { backgroundColor: getMessageBackgroundColor(smokeLevel3, temperature3) }]}>
                    <Text>{getMessage(smokeLevel3, temperature3)}</Text>
                </View>
            </View>
        </View>
    );
};

const getMessageBackgroundColor = (smokeLevel, temperature) => {
    if (smokeLevel >= 470) {
        return 'red';
    } else if (smokeLevel >= 400 && smokeLevel < 470) {
        return 'orange';
    } else {
        return 'green';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#0a2244',
        color: '#ffffff',
    },
    section: {
        marginBottom: 20,
        color: '#ffffff',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ffffff',
    },
    box: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: '#ffffff',
    },
    messageBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,

    },
    text: {
        color: '#ffffff'
    },
});

export default Dashboard;
