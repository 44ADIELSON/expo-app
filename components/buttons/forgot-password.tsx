import { View, Text, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";

export const ForgotPassword = () => {
  const router = useRouter();

  return (
    <View>
      <Link
        href="./"
        style={[
          {
            fontSize: 16,
            textDecorationLine: "underline",
            letterSpacing: 1,
            fontFamily: "System",
            fontWeight: 100,

            marginVertical: 10,
          },
        ]}
      >
        Esqueceu a senha
      </Link>
    </View>
  );
};
