import React from 'react';
import PropTypes from 'prop-types';
import imgFlutter from '../../assets/flutter2.png';
import imgReact from '../../assets/react-native.png';
import imgXamarin from '../../assets/xamarin.jpg';

import {
  Container,
  ImagesContainer,
  Flutter,
  Xamarin,
  ReactNative,
  ConsumerApiButton,
  TextButton,
} from './styles';

export default function Initial({navigation}) {
  return (
    <Container>
      <ImagesContainer>
        <Flutter source={imgFlutter} />
        <ReactNative source={imgReact} />
        <Xamarin source={imgXamarin} />
      </ImagesContainer>
      <ConsumerApiButton onPress={() => navigation.navigate('MainGit')}>
        <TextButton> Consultar Api - GitHub </TextButton>
      </ConsumerApiButton>
      <ConsumerApiButton onPress={() => navigation.navigate('PageCamera')}>
        <TextButton> Tirar uma foto </TextButton>
      </ConsumerApiButton>
      <ConsumerApiButton onPress={() => navigation.navigate('Benchmark')}>
        <TextButton> Teste de Benchmark </TextButton>
      </ConsumerApiButton>
    </Container>
  );
}

Initial.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Initial.navigationOptions = {
  headerStyle: {
    backgroundColor: '#3700B3',
  },
  headerTintColor: '#fff',
  title: 'Comparativo entre Frameworks',
};
