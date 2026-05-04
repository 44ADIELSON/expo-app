import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

// Tipagem mínima focada apenas no que vamos usar
interface ClimaTeste {
    daily: { sunrise: string[]; sunset: string[] };
}

export default function App() {
    const [dados, setDados] = useState<ClimaTeste | null>(null);
    const [erro, setErro] = useState<string>('');
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            try {
                // 1. Permissão e Localização
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    return setErro('Permissão negada.');
                }

                const { coords: { latitude: lat, longitude: lon } } = await Location.getCurrentPositionAsync({});

                setLat(lat);
                setLon(lon);

                // 2. Chamada da API com URL simplificada
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&timezone=auto&forecast_days=1`;
                const response = await fetch(url);
                
                if (!response.ok) throw new Error('Erro na API');
                
                setDados(await response.json());
            } catch (e) {
                setErro('Falha ao processar os dados.');
            }
        })();
    }, []);

    // Renderizações de bloqueio (Erro ou Carregamento)
    if (erro) return <View style={styles}><Text>{erro}</Text></View>;
    if (!dados) return <View style={styles}><ActivityIndicator size="large" /></View>;

    // Tela Principal
    return (
        <View style={styles}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Teste API + Location</Text>
            <Text>🌅 Nascer do sol: {dados.daily.sunrise[0]}</Text>
            <Text>🌇 Pôr do sol: {dados.daily.sunset[0]}</Text>
            <Text>Aqui sua latitude e longitude:</Text>
            <Text>Lat: {lat}</Text>
            <Text>Lon: {lon}</Text>
        </View>
    );
}

const styles = {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
};