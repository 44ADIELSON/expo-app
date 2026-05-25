Observação: o Metro avisou que a versão esperada é react-native-worklets@0.5.1, enquanto a instalada é 0.8.3. Se surgirem problemas de compatibilidade, rode: npm install react-native-worklets@0.5.1 --save


        let location = await Location.getCurrentPositionAsync({});
        setlocation(location);

        let addresses = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setTexto(addresses[0].formattedAddress);