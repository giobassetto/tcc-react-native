import React, {useState, useEffect} from 'react';
import api2 from '../../services/apiBenchmark';

import {
  Container,
  InitTestButton,
  TextButton,
  TextResult,
  ResultContainer,
} from './styles';

export default function Benchmark() {
  const [time, setTime] = useState('');
  const [arr, setArr] = useState();

  useEffect(() => {
    async function getData() {
      const {data} = await api2.get();
      setArr(data.fields.names.arrayValue.values);
    }
    getData();
  }, []);

  function bechmarckTest() {
    const initial = new Date().getTime();

    for (let j = 0; j < 100000; j++) {
      let a;
      for (let i = arr.length; i-- > 0; ) {
        a = arr[i].stringValue;
      }
      arr.forEach(function(b) {
        a = b.stringValue;
      });
    }

    const final = new Date().getTime();

    setTime((final - initial) / 1000);
  }
  return (
    <Container>
      <InitTestButton onPress={() => bechmarckTest()}>
        <TextButton>Iniciar Teste </TextButton>
      </InitTestButton>
      <ResultContainer>
        <TextResult>Tempo: {time}</TextResult>
      </ResultContainer>
    </Container>
  );
}

Benchmark.navigationOptions = {
  headerStyle: {
    backgroundColor: '#3700B3',
  },
  headerTintColor: '#fff',
  title: 'Benchmark',
};
