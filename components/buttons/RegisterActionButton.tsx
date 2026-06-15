import React from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";

interface RegisterActionButtonProps {
  onPress: () => void;
  loading?: boolean;
}

export const RegisterActionButton = ({ onPress, loading = false }: RegisterActionButtonProps) => {
  return (
    <View style={styles.viewContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.8 }
        ]}
        onPress={onPress}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#f3f3ff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 330,
    height: 50,
    borderRadius: 15,
    elevation: 4,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: "#242440",
  },
  buttonText: {
    color: "#f3f3ff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 5,
  },
});