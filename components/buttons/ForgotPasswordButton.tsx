import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export const ForgotPasswordButton = () => {
  return (
    <View>
      <Link href="./" style={styles.LinkStyle}>
        Esqueceu a senha
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  LinkStyle: {
    fontSize: 16,
    textDecorationLine: "underline",
    letterSpacing: 1,
    fontFamily: "System",
    fontWeight: "100",
    marginVertical: 10,
  }
});
