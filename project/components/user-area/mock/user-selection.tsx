import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import {useState, useEffect} from 'react'

import { useRouter } from 'expo-router';

import UserCard from './user-card';

type User = {
  nome: string;
  foto: string;
};

const SelecaoPerfil = () => {
  const router = useRouter();

  const [dados, SetDados] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await fetch(
        'https://randomuser.me/api/?results=1&nat=br&gender=female'
      );
      const dados = await response.json();
      SetDados(dados);

      const metMAP = dados.results.map((dados: any) => {
        return {
          nome: dados.name.first + ' ' + dados.name.last,
          foto: dados.picture.large
        };
      });
      SetDados(metMAP);
    } catch (error) {
      console.log('Algo saiu mal', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={estilos.view}>

      <View>
          <FlatList
            numColumns={3}
            columnWrapperStyle={estilos.flatlistColum}
            data={dados}
            renderItem={({ item }: { item: User }) => (
              <UserCard nome={item.nome} foto={item.foto} />
            )}
            />
      </View>

    </View>
  );
};

const estilos = StyleSheet.create({
  view: {
    flex: 1,
    gap: 25,
  },
  flatlistColum: {
    flex: 1,
    gap: 15,
  }
});

export default SelecaoPerfil;
