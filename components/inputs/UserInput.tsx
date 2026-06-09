import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
  error?: boolean;
  onSubmitEditing?: () => void;
  returnKeyType?: any;
  disabled?: boolean;
};

export const UserInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
  error,
  onSubmitEditing,
  returnKeyType,
  disabled,
}: Props) => {
  const [ocultarSenha, setOcultarSenha] = useState(!!secureTextEntry);

  return (
    <View style={styles.ViewAll} pointerEvents={disabled ? "none" : "auto"}>
      <TextInput
        mode="outlined"
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        outlineStyle={styles.inputOutline}
        textColor="#000"
        activeOutlineColor="#6200ee"
        keyboardType={keyboardType}
        editable={!disabled}
        autoCapitalize="none"
        autoCorrect={false}
        error={!!error}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry && ocultarSenha}
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={ocultarSenha ? "eye" : "eye-off"}
              onPress={() => setOcultarSenha(!ocultarSenha)}
            />
          ) : undefined
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
