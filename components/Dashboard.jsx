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

    const [data, setData] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomSmokeLevel = Math.floor(Math.random() * 101);
            const randomTemperature = Math.floor(Math.random() * 51) + 20;
            setSmokeLevel1(randomSmokeLevel);
            setTemperature1(randomTemperature);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
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
        if (smokeLevel > 50 && temperature > 30) {
            return '¡Peligro! Altos niveles de humo y temperatura';
        } else if (smokeLevel > 50) {
            return '¡Alerta! Alto nivel de humo';
        } else if (temperature > 30) {
            return '¡Alerta! Alta temperatura';
        } else {
            return 'Todo en orden';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sección 1</Text>
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
                <Text style={styles.sectionTitle}>Sección 2</Text>
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
                <Text style={styles.sectionTitle}>Sección 3</Text>
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
    if (smokeLevel > 50 && temperature > 30) {
        return 'red'; // Peligro
    } else if (smokeLevel > 50 || temperature > 30) {
        return 'orange'; // Alerta
    } else {
        return 'green'; // Todo en orden
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
