import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

type User = {
  nome: string;
  foto: string;
};

const UserSelection = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser({ nome: u.displayName || 'Usuário', foto: u.photoURL || '' });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  return (
    <View>
      {user && (
        <View style={estilos.item}>
          <UserCard nome={user.nome} foto={user.foto} />
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

export default UserSelection;
