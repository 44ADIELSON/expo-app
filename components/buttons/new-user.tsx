import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export const NewUser = () => {
  return (
    <View style={[{alignItems: 'center', justifyContent: 'center'}]}>
      <Link href="./" style={styles.TextReference}>
        Ainda não tem uma conta? Cadastre-se
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  TextReference: {
    alignItems: "flex-end",
    justifyContent: 'center',

    fontSize: 16,
    letterSpacing: 1,
    fontFamily: "System",
    fontWeight: 100,

    marginVertical: 10,
  },
});
