import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  margin-top: 35px;
  display: flex;
  flex: 1;
`;

export const ImagesContainer = styled.View`
  margin: 25px;
  align-items: stretch;
  flex-direction: row;
`;

export const Flutter = styled.Image`
  height: 115px;
  width: 115px;
  margin: 5px;
`;

export const ReactNative = styled.Image`
  height: 115px;
  width: 115px;
  margin: 5px;
`;

export const Xamarin = styled.Image`
  height: 115px;
  width: 115px;
  margin: 5px;
`;

export const ConsumerApiButton = styled(RectButton)`
  margin-top: 30px;
  align-self: center;
  border-radius: 4px;
  background: #3700b3;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 80%;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;
