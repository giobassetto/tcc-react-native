import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const InitTestButton = styled(RectButton)`
  margin-top: 50px;
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

export const ResultContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 45px;
`;

export const TextResult = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
