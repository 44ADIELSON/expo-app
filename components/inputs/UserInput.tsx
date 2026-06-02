import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-paper";

export const UserInput = () => {
  const [ocultarSenha, setOcultarSenha] = useState(true);

  return (
    <View style={styles.ViewAll}>
      <TextInput
        mode="outlined"
        label="Endereço de e-mail"
        placeholder="Ex: email@exemplo.com"
        style={styles.input}
        outlineStyle={styles.inputOutline}
        textColor="#000"
        activeOutlineColor="#6200ee"
      />

      <TextInput
        mode="outlined"
        label="Digite sua senha"
        secureTextEntry={ocultarSenha}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        style={styles.input}
        outlineStyle={styles.inputOutline}
        textColor="#000"
        activeOutlineColor="#6200ee"
        right={
          <TextInput.Icon
            icon={ocultarSenha ? "eye" : "eye-off"}
            onPress={() => setOcultarSenha(!ocultarSenha)}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ViewAll: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    padding: 10,
  },

  input: {
    width: 330,
    backgroundColor: "#ffffff",
    fontSize: 16,
    elevation: 2,
  },

  inputOutline: {
    borderRadius: 15,
    borderWidth: 1,
  },
});

export default UserInput;
