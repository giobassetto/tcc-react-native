import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Keyboard, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  ProfileButtonRemove,
  ContainerButtons,
} from './styles';
import api from '../../services/api';

export default function MainGit({navigation}) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUsers() {
      setUsers(JSON.parse(await AsyncStorage.getItem('Users')));
    }
    getUsers();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('Users', JSON.stringify(users));
  }, [users]);

  async function handleNewUser() {
    setLoading(true);
    if (newUser === '') {
      Keyboard.dismiss();
      return;
    }
    const response = await api.get(`/users/${newUser}`);
    console.log(response.data);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    setUsers([...users, data]);
    setNewUser('');
    setLoading(false);

    Keyboard.dismiss();
  }

  function handleNavigate(user) {
    navigation.navigate('User', {user});
  }

  function handleRemove(user) {
    const removeUser = users.filter(item => item.login !== user.login);
    setUsers(removeUser);
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar Usuário"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleNewUser}
        />
        <SubmitButton onPress={handleNewUser}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({item}) => (
          <User>
            <Avatar
              source={{
                uri: item.avatar,
              }}
            />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ContainerButtons>
              <ProfileButton onPress={() => handleNavigate(item)}>
                <ProfileButtonText> Ver Perfil</ProfileButtonText>
              </ProfileButton>
              <ProfileButtonRemove onPress={() => handleRemove(item)}>
                <ProfileButtonText>Remover</ProfileButtonText>
              </ProfileButtonRemove>
            </ContainerButtons>
          </User>
        )}
      />
    </Container>
  );
}

MainGit.navigationOptions = {
  headerStyle: {
    backgroundColor: '#3700B3',
  },
  headerTintColor: '#fff',
  title: 'Usuários',
};

MainGit.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
