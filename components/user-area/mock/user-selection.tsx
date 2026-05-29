import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import UserCard from "./user-card";

type User = {
  nome: string;
  foto: string;
  lat?: number;
  lon?: number;
};

const SelecaoPerfil = () => {
  const [dados, SetDados] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://randomuser.me/api/?results=1&nat=br&gender=female",
      );
      const dados = await response.json();

      const metMAP = dados.results.map((d: any) => ({
        nome: d.name.first,
        foto: d.picture.large,
      }));
      SetDados(metMAP);
    } catch (error) {
      console.log("Algo saiu mal", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View>
      {dados.length > 0 && (
        <View style={estilos.item}>
          <UserCard nome={dados[0].nome} foto={dados[0].foto} />
        </View>
      )}
    </View>
  );
};

const estilos = StyleSheet.create({
  item: {
    alignItems: "flex-start",
    fontFamily: "System"
  },
});

export default SelecaoPerfil;
