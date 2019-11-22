/* eslint-disable no-undef */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// import { Container } from './styles';

export default function Mapa() {
  const [region, setRegion] = useState(null);
  useEffect(() => {
    Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      if (region !== null) {
        if (region.latitude !== latitude && region.longitude !== longitude) {
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          });
        }
      } else if (region === null) {
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        });
      }
    });
  }, [region]);
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={region}
        showsUserLocation
        loadingEnabled
      />
    </View>
  );
}

Mapa.navigationOptions = {
  headerStyle: {
    backgroundColor: '#3700B3',
  },
  headerTintColor: '#fff',
  title: 'Localização',
};
