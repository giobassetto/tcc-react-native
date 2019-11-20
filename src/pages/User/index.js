import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';
import api from '../../services/api';

export default function User({navigation}) {
  const user = navigation.getParam('user');
  const [stars, setStars] = useState([]);

  useEffect(() => {
    async function getStars() {
      const response = await api.get(`/users/${user.login}/starred`);

      setStars(response.data);
    }

    getStars();
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={{uri: user.avatar}} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <Stars
        data={stars}
        keyExtractor={star => String(star.id)}
        renderItem={({item}) => (
          <Starred>
            <OwnerAvatar source={{uri: item.owner.avatar_url}} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};

User.navigationOptions = ({navigation}) => ({
  headerStyle: {
    backgroundColor: '#3700B3',
  },
  headerTintColor: '#fff',
  title: navigation.getParam('user').name,
});
