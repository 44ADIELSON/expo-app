import { View, StyleSheet, Pressable, Text } from "react-native";
import { Link } from "expo-router";

type Props = {
  onPress?: () => void;
};

export const ForgotPasswordButton = ({ onPress }: Props) => {
  if (onPress) {
    return (
      <View>
        <Pressable onPress={onPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.LinkStyle}>Esqueceu a senha</Text>
        </Pressable>
      </View>
    );
  }

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
