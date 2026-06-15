import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";

type Props = {
  onPress?: () => void;
  disabled?: boolean;
  title?: string;
  loading?: boolean;
};

export const EnterButton = ({ onPress, disabled, title = "Entrar", loading = false }: Props) => {
  return (
    <View>
      <Pressable
        style={[estilos.EnterButton, disabled ? estilos.disabled : null]}
        onPress={onPress}
        disabled={!!disabled || loading}
      >
        {loading ? (
          <ActivityIndicator color="#f3f3ff" />
        ) : (
          <Text style={estilos.EnterButtonText}>{title}</Text>
        )}
      </Pressable>
    </View>
  );
};

const estilos = StyleSheet.create({
  EnterButton: {
    alignItems: "center",
    justifyContent: "center",

    minWidth: 330,
    height: 50,

    borderRadius: 15,
    elevation: 2,

    padding: 10,
    marginBottom: 20,

    //  Equivalente iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1, // 1px vertical
    },
    shadowOpacity: 0.25, // rgba(0,0,0,0.25)
    shadowRadius: 1, // 1px blur

    backgroundColor: "#242440",

    fontFamily: "System",
  },
  EnterButtonText: {
    color: "#f3f3ff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 5
  },
  disabled: {
    backgroundColor: "#9e9ea8",
    opacity: 0.8,
  },
});