import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex: 1;
`;

export const BtnButton = styled.TouchableOpacity`
  z-index: 99999;
  margin-top: 40px;
  align-self: center;
  border-radius: 4px;
  background-color: #3700b3;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 50%;
`;

export const BtnButtonLight = styled.TouchableOpacity`
  z-index: 99999;
  margin-top: 40px;
  align-self: center;
  border-radius: 4px;
  background-color: #dcdcdc;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 50%;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

export const TextButtonLight = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000013;
  text-align: center;
`;

export const ContentModal = styled.View`
  background-color: #fff;
  padding: 12px;
  margin: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.1);
`;
